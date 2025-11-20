FlowCast Studio – TikTok Video Publishing Tool (For Internal Creators)

FlowCast Studio is a lightweight, web-based tool designed for authorized internal creators to manage and publish our team's video materials.
This project demonstrates TikTok Login, scope usage, and the complete content-posting flow for Content Posting API review.

🌟 Features
1. TikTok Login (OAuth 2.0 Login Kit)

This tool integrates TikTok Login Kit to allow a secure and verified login flow.

Redirects users to TikTok authorization page

Retrieves the authorization code after login

Sends the code to backend for token exchange

Displays basic user profile (avatar & display name) using user.info.basic scope

Used scopes demonstrated:

user.info.basic

2. Internal Video Selection Interface

Creators can choose:

A local demo video

Or a pre-registered internal video item (used only for review demonstration)

This UI simulates the user selecting a video before sending it to TikTok.

3. Content Posting Flow (Demo of Content Posting API)

After selecting a video:

User clicks Publish to TikTok

Frontend sends a publish request to backend /api/upload

Backend receives the request and returns success

Frontend shows “Publish Successful”

This demonstrates how:

video.upload can draft a video

video.publish can publish a video to TikTok

Used scopes demonstrated:

video.upload

video.publish

To comply with review rules, this demo focuses on workflow, UI, and API behavior.
No actual user content is posted.

⚙️ System Architecture Overview
Frontend (GitHub Pages)
 ├─ TikTok Login UI
 ├─ Video Selection Page
 └─ Publish Flow UI
        ↓
Backend API (Flask)
 ├─ /api/exchange_token  
 └─ /api/upload  
        ↓
TikTok APIs (Sandbox Mode)


Frontend handles TikTok OAuth redirection, video selection, and interactive UI

Backend exchanges OAuth codes and receives publish requests

Sandbox environment used for safe demonstration during TikTok App Review

🔐 Purpose & Compliance

This tool is not a public consumer-facing app

Only authorized internal creators use this tool to publish our own studio content

No third-party user uploads are supported

Built strictly to integrate with TikTok Content Posting API per review guidelines
