## 2026-07-23 - [Input MIME type validation for image processing]
**Vulnerability:** Unsanitized portrait image uploads allowed uploading files with arbitrary MIME types (including unsafe HTML, SVGs with embedded scripts, or non-image payloads).
**Learning:** Checking only file size is insufficient; browsers can be tricked into loading potentially malicious formats which can trigger execution context issues or performance degradation.
**Prevention:** Strictly validate file.type against a whitelist of safe image formats (JPEG, PNG, WEBP) at the entry point of processing.
