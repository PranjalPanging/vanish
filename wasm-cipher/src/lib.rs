use wasm_bindgen::prelude::*;
use aes_gcm::{
    aead::{Aead, KeyInit}, // Use KeyInit instead of NewAead
    Aes256Gcm, Nonce, Key
};
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct EncryptedData {
    pub ciphertext: Vec<u8>,
    pub key: Vec<u8>,
    pub nonce: Vec<u8>,
}

#[wasm_bindgen]
pub fn encrypt_file(data: &[u8]) -> Result<JsValue, JsValue> {
    let mut key_bytes = [0u8; 32];
    getrandom::getrandom(&mut key_bytes).map_err(|_| "Entropy failure")?;
    let key = Key::<Aes256Gcm>::from_slice(&key_bytes);

    let mut nonce_bytes = [0u8; 12];
    getrandom::getrandom(&mut nonce_bytes).map_err(|_| "Entropy failure")?;
    let nonce = Nonce::from_slice(&nonce_bytes);

    let cipher = Aes256Gcm::new(key);
    let ciphertext = cipher
        .encrypt(nonce, data)
        .map_err(|_| "Encryption failure")?;

    let result = EncryptedData {
        ciphertext,
        key: key_bytes.to_vec(),
        nonce: nonce_bytes.to_vec(),
    };

    serde_wasm_bindgen::to_value(&result).map_err(|e| e.into())
}