use wasm_bindgen::prelude::*;
use aes_gcm::{
    aead::{Aead, KeyInit},
    Aes256Gcm, Nonce
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
    getrandom::getrandom(&mut key_bytes).map_err(|_| "Failed to generate key")?;
    let key = Aes256Gcm::generate_key(&mut key_bytes);

    let mut nonce_bytes = [0u8; 12];
    getrandom::getrandom(&mut nonce_bytes).map_err(|_| "Failed to generate nonce")?;
    let nonce = Nonce::from_slice(&nonce_bytes);

    let cipher = Aes256Gcm::new(&key);

    let ciphertext = cipher
        .encrypt(nonce, data)
        .map_err(|_| "Encryption failed")?;

    let result = EncryptedData {
        ciphertext,
        key: key_bytes.to_vec(),
        nonce: nonce_bytes.to_vec(),
    };

    serde_wasm_bindgen::to_value(&result).map_err(|e| e.into())
}

#[wasm_bindgen]
pub fn decrypt_file(ciphertext: &[u8], key_bytes: &[u8], nonce_bytes: &[u8]) -> Result<Vec<u8>, JsValue> {
    let key = Aes256Gcm::new_from_slice(key_bytes).map_err(|_| "Invalid key length")?;
    let nonce = Nonce::from_slice(nonce_bytes);

    let plaintext = key
        .decrypt(nonce, ciphertext)
        .map_err(|_| "Decryption failed (Invalid key or corrupted data)")?;

    Ok(plaintext)
}