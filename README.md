# DCC-Server-Tester

A test script to load-test DCC servers.

## To Test

 - Build this project with `npm run build`
 - Go to https://dashboard.dcconsortium.org (or another test instance)
 - Click on “Create new batch” and upload a CSV with an email you have access to
```
earnerName,degreeType,subject,credentialName,emailAddress
John Doe,Bachelor of Science,Computer Science,Bachelors,john@example.com
```
 - Send the email
 - Copy the link provided in the email
 - Run the following commmand
```bash
npm run test --emailed_url="{{LINK}}"
# For Example
npm run test --emailed_url="https://claim.dcconsortium.org/?token=eyJhbGciOiJIUbI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjY2NDE1MWMzZTgxYWRjZjQ3YWQ4NyIsImlhdCI6MTcxMDY0NjMwNSwiZXhwIjoxNzExODU1OTA1fQ.lFl_ev0o39oRmIJo6WhR-nHi_yZTkca5MSdXc-U4Ri0"
```
