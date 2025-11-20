# TikTok Video Publishing Tool (Internal Use)

This is a lightweight web-based tool designed for **internal team members** to manage and publish our own video materials.  
It supports TikTok OAuth login, selecting internal video files, and sending them to our backend for processing.

This project is built for **TikTok Content Posting API review**.

---

## 🔑 Features

### 1. TikTok Login (OAuth 2.0)
Users can authenticate using TikTok Login Kit.

- Redirects to TikTok authorization page
- Retrieves authorization `code`
- Sends code to backend for token exchange (demo mode)
- Displays user info after login (mocked or real)

### 2. Video Selection UI
Users can:

- Upload a local file  
- OR select an internal video entry (demo items)

### 3. Publish Flow (Demo)
After selecting a video:

- User clicks **Publish to TikTok**
- Frontend sends request to backend `/api/upload`
- Backend returns `{ success: true }`
- Frontend shows “Publish Successful”  
- *Actual file upload is not required for the review*

This demonstrates the complete **Content Posting API** workflow.

---

## ⚙️ System Architecture

