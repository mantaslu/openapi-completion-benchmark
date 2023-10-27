import { truncateToTokenLength } from "../tokenizer.js";

const MAX_COMPONENTS_TOKENS = 1000;

const def = `
openapi: 3.0.0
servers:
  - description: Replace accountname with your account name
    url: https://accountname.exavault.com/api/v2
info:
  contact:
    email: support@exavault.com
    name: ExaVault Support
  description: ExaVaults API allows you to incorporate ExaVaults suite of file transfer and user management tools into your own application.\nExaVault supports both POST (recommended when requesting large data sets) and GET operations, and requires an API key in order to use.
  title: ExaVault
  version: "2.0"
  x-apisguru-categories:
    - storage
  x-logo:
    backgroundColor: "#222222"
    url: https://twitter.com/ExaVaultInc/profile_image?size=original
  x-origin:
    - converter:
        url: https://github.com/mermade/oas-kit
        version: 2.6.0
      format: openapi
      url: https://exavault-website.cdn.prismic.io/exavault-website/2d2d871e-394d-433e-9305-f38b6656f279_evapi_2.0_public.yaml
      version: "3.0"
  x-providerName: exavault.com
externalDocs:
  url: https://www.exavault.com/developer/
tags:
  - description: This section contains information on how to authenticate and logout from the API. **All ExaVault API calls (other than the authenticateUser method itself) require an access token.**
    name: Authentication
  - description: The file and folder management APIs allow you to work with the core of your account. You can upload or download files and create, move and delete files & folders, to name a few options.
    name: Resources
  - description: The activity APIs allow you to get logs from your account. We track multiple types of under the umbrellas; __Activity Logs__ that show an action a user performed or initiated on a file, folder or the account. __Webhooks Logs__ that show records of all outbound webhook calls made by ExaVault. Both can be optionally filtered to only return specific data you’re looking for.
    name: Activity
  - description: The user APIs allow you to create, update and delete users from your account. Users can be assigned unique permissions, set to expire after a certain time period, and more.
    name: Users
  - description: The sharing APIs allow you create and manage shares. Shares can be used to send a single file, share a folder, or set up a receive folder and its input form.
    name: Shares
  - description: The notifications APIs allow you to set up and manage notifications in your account. When an action is taken on a file folder, you can be notified via email or webhook.
    name: Notifications
  - description: The email lists APIs allow you to manage email lists that can be used for speeding up actions within the ExaVault File Manager such as adding your marketing team, Tom, Jane, and Harry, to a shared folder in a single action instead of three.
    name: Email Lists
  - description: The account APIs allow you review and change account settings. Many account settings will have immediate effects on all current and future users, so consider adding a user facing confirmation step before sending an update call.
    name: Account
  - description: THe SSH Keys APIs allow you to manage SSH keys for users in your account. You can upload the contents of a public key for a user, get information for keys which are already defined, and remove a key from a user.
    name: SSH Keys
  - description: The forms APIs allow you to manage the inputs and data submitted through receive folder forms.
    name: Form
  - description: The recipients APIs allow to retrieve, delete, or resend invitations for recipients of shared folders.
    name: Recipients
  - description: The emails APIs allow you to generate welcome emails for account users and referral emails.
    name: Email
paths:
  /account:
    get:
      description: Get settings for your account, such as current space usage, webhooks settings, welcome email content and IP address restrictions.
      operationId: getAccount
      parameters:
        - description: API Key required for the request
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token for the request
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: Related records to include in the response. Valid option is **masterUser**
          in: query
          name: include
          schema:
            example: masterUser
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accountName: exampleaccount
                    accountOnboarding: true
                    allowedIp: null
                    branding: true
                    clientId: 1
                    complexPasswords: false
                    created: 2019-05-30T20:48:57Z
                    customDomain: false
                    customSignature: null
                    externalDomains: null
                    maxUsers: 5
                    modified: 2019-08-27T01:03:41Z
                    quota:
                      bandwidthLimit: 9223372036854776000
                      bandwidthUsed: 0
                      diskLimit: 107374182400
                      diskUsed: 4770252339
                      noticeEnabled: false
                      noticeThreshold: 90
                      transactionsLimit: 120000
                      transactionsNoticeEnabled: false
                      transactionsNoticeThreshold: 90
                    secureOnly: false
                    showReferralLinks: true
                    status: 1
                    userCount: 4
                    welcomeEmailContent: |
                      "Great news, your new account is ready!\n\nFor your records, we've listed information you'll use to log in below:\n\nFTP Server: [[ftpserver]]\n\nUsername (Web and FTP access): [[username]]\n\n[[setpassword]]"
                    welcomeEmailSubject: ExaVault File Sharing Account
                  id: 7
                  included:
                    - attributes:
                        accessTimestamp: 2019-09-06T11:40:29Z
                        accountId: 2
                        accountName: examplemasteraccount
                        created: 2019-05-29T20:48:57Z
                        email: user@example.com
                        expiration: null
                        firstLogin: false
                        homeDir: /
                        modified: 2019-07-27T01:03:41Z
                        nickname: examplenickname
                        onboarding: true
                        permissions:
                          changePassword: true
                          delete: true
                          deleteFormData: true
                          download: true
                          list: true
                          modify: true
                          notification: true
                          share: true
                          upload: true
                          viewFormData: true
                        role: master
                        status: 1
                        timeZone: UTC
                        username: examplemasteruser
                      id: 1
                      relationships:
                        homeResource:
                          data:
                            id: 2554051
                            type: resource
                        ownerAccount:
                          data:
                            id: 124437
                            type: account
                      type: user
                  relationships:
                    masterUser:
                      data:
                        id: 1
                        type: user
                  type: account
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/AccountResponse"
          description: Successful operation
      summary: Get account settings
      tags:
        - Account
    patch:
      description: |-
        Update account settings, such as welcome email content, IP address restrictions, webhooks settings and secure password requirements.

        **Notes**

        - You must have [admin-level access](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to change account settings.
      operationId: updateAccount
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            example:
              accountOnboarding: true
              allowedIpRanges:
                - ipEnd: 67.208.64.254
                  ipStart: 67.208.64.228
              brandingSettings:
                companyName: Example File Transfer
                theme: light
              complexPasswords: true
              customSignature: Please consider the planet before printing this email
              emailContent: Greetings, ExampleUser!  Your account is ready for you to start transferring files right now. Here's your link to set up your account [[setpassword]]  Henceforth, you shall be known as [[username]]
              emailSubject: Welcome to the Example Account
              externalDomain: https://example.com/files
              quota:
                noticeEnabled: true
                noticeThreshold: 90
                transactionsNoticeEnabled: true
                transactionsNoticeThreshold: 80
              secureOnly: true
              showReferralLinks: false
            schema:
              properties:
                accountOnboarding:
                  description: Whether extra help popups can be enabled for users in the web file manager.
                  example: true
                  type: boolean
                allowedIpRanges:
                  description: IP Address Ranges for restricting account access
                  items:
                    properties:
                      ipEnd:
                        format: ipv4
                        type: string
                      ipStart:
                        format: ipv4
                        type: string
                    type: object
                  type: array
                brandingSettings:
                  properties:
                    companyName:
                      description: Custom company name to include in copyright and title bar.
                      type: string
                    customEmail:
                      description: Address to use as sender of email messages generated by ExaVault
                      example: custom@example.com
                      format: email
                      type: string
                    theme:
                      description: Color scheme for web file manager. Valid options are **default**, **light** and **dark**
                      example: default
                      type: string
                  title: BrandingSettingsValues
                  type: object
                complexPasswords:
                  description: Whether to require complex passwords for all passwords.
                  example: false
                  type: boolean
                customSignature:
                  description: Signature to be automatically added to the bottom of emails generated by the account.
                  type: string
                emailContent:
                  description: Content of welcome email template.
                  example: "Great news, your new account is ready! For your records, we've listed information you'll use to log in below: FTP Server: [[ftpserver]] Username (Web and FTP access): [[username]] [[setpassword]]"
                  type: string
                emailSubject:
                  description: Subject line for welcome emails
                  example: ExaVault File Sharing Account
                  type: string
                externalDomain:
                  description: Custom address used for web file manager. Not available for all account types.
                  type: string
                quota:
                  description: ""
                  properties:
                    noticeEnabled:
                      description: Whether the system should email the account owner if the account storage exceeds the noticeThreshold value. Storage notice emails are sent no mo once per day.
                      type: boolean
                    noticeThreshold:
                      description: Percent of account storage that would trigger a notice email. Must be a whole number between 70 and 100 (inclusive).
                      type: integer
                    transactionsNoticeEnabled:
                      description: Whether the system should email the account owner if the daily transaction usage exceeds the transactionsNoticeThreshold value. Transaction notice emails are sent no more than once per day.
                      type: boolean
                    transactionsNoticeThreshold:
                      description: Percent of daily transaction usage that would trigger a notice email. Must be a whole number between 70 and 100 (inclusive).
                      type: integer
                  title: AccountQuotaValues
                  type: object
                secureOnly:
                  description: Whether unencrypted FTP connections should be denied for the account.
                  example: false
                  type: boolean
                showReferralLinks:
                  description: Whether to display links for others to sign up on share views and invitation emails
                  example: false
                  type: boolean
              title: UpdateAccountRequestBody
              type: object
        description: Update Account Settings
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accountName: exampleaccount
                    accountOnboarding: true
                    allowedIp: []
                    branding: true
                    brandingSettings:
                      accountName: exampleaccount
                      companyName: Example Company
                      created: 2021-01-14T11:06:52-08:00
                      customEmail: custom@example.com
                      logo: examplelogo.png
                      logoExt: png
                      modified: 2021-02-08T10:35:15-08:00
                      theme: default
                      verifiedDomain: null
                      verifiedDomainId: null
                      verifiedDomainValid: false
                    clientId: 1
                    complexPasswords: false
                    created: 2019-05-30T20:48:57Z
                    customDomain: false
                    customSignature: null
                    externalDomains: null
                    maxUsers: 5
                    modified: 2019-08-27T01:03:41Z
                    quota:
                      bandwidthLimit: 9223372036854776000
                      bandwidthUsed: 0
                      diskLimit: 107374182400
                      diskUsed: 4770252339
                      noticeEnabled: true
                      noticeThreshold: 90
                      transactionsLimit: 120000
                      transactionsNoticeEnabled: true
                      transactionsNoticeThreshold: 80
                    secureOnly: false
                    showReferralLinks: true
                    status: 1
                    userCount: 4
                    welcomeEmailContent: |
                      "Great news, your new account is ready!\n\nFor your records, we've listed information you'll use to log in below:\n\nFTP Server: [[ftpserver]]\n\nUsername (Web and FTP access): [[username]]\n\n[[setpassword]]"
                    welcomeEmailSubject: ExaVault File Sharing Account
                  id: 6
                  relationships:
                    masterUser:
                      data:
                        id: 1
                        type: user
                  type: account
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/AccountResponse"
          description: Successful operation
      summary: Update account settings
      tags:
        - Account
  /activity/session:
    get:
      description: |
        Returns the detailed activity logs for your account. Optional query paramaters will filter the returned results based on a number of options including usernames, activity types, or date ranges.

        **NOTE:** Total Results will always return as 0 to avoid quering data you're not using and stay as performant as possible.

        **Operation Types**
        Session activity is logged with an operation type that is different from what is visible through the [activity log interface in the web file manager](/docs/account/10-activity-logs/00-activity-logs). Consult the table below to compare the two:

        | File Manager Value | API Value | Notes |
        |-----|----|---|
        | Connect | PASS | |
        | Disconnect | EXIT | |
        | Upload | STOR | |
        | Download | RETR | |
        | Delete | DELE | |
        | Create Folder | MKD | |
        | Rename | RNTO | |
        | Move | MOVE | |
        | Copy | COPY | |
        | Compress | COMPR | |
        | Extract | EXTRACT | |
        | Shared Folders | SHARE | |
        | Send Files | SEND | |
        | Receive Files | RECV | |
        | _N/A_ | EDIT\_SEND | Update send. Not shown in file manager |
        | Update Share | EDIT\_SHARE| |
        | Update Receive | EDIT\_RECV | |
        | Delete Send | DELE\_SEND | |
        | Delete Receive | DELE\_RECV | |
        | Delete Share | DELE\_SHARE | |
        | Create Notification | NOTIFY | |
        | Update Notification | EDIT\_NTFY| |
        | Delete Notification | DELE\_NTFY | |
        | Create User | USER | |
        | Update User | EDIT\_USER | |
        | Delete User | DELE\_USER | |
        | _N/A_ | DFA | Create direct link. Not shown in file manager |
        | _N/A_ | EDIT\_DFA | Update direct link options. Not shown in file manager |
        | _N/A_ | DELE\_DFA | Deactivate direct link. Not shown in file manager|
      operationId: getSessionLogs
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: Start date of the filter data range
          example: 2019-10-18T06:48:40Z
          in: query
          name: startDate
          schema:
            format: date-time
            type: string
        - description: End date of the filter data range
          example: 2019-10-18T06:48:40Z
          in: query
          name: endDate
          schema:
            format: date-time
            type: string
        - description: Used to filter session logs by ip address.
          example: 127.0.0.1
          in: query
          name: ipAddress
          schema:
            type: string
        - description: Username used for filtering a list
          example: jdoe
          in: query
          name: username
          schema:
            type: string
        - description: Path used to filter records
          example: /folder*
          in: query
          name: path
          schema:
            type: string
        - description: Filter session logs for operation type (see table above for acceptable values)
          example: EDIT_SHARE
          in: query
          name: type
          schema:
            type: string
        - description: Offset of the records list
          example: 100
          in: query
          name: offset
          schema:
            type: integer
        - description: Limit of the records list
          example: 10
          in: query
          name: limit
          schema:
            type: integer
        - description: Comma separated list sort params
          in: query
          name: sort
          schema:
            example: -date
            type: string
      responses:
        "200":
          content:
            application/json:
              examples:
                example-1:
                  value:
                    data:
                      - attributes:
                          bytesTransferred: 10815676
                          created: 2019-10-18T06:48:40Z
                          duration: 5
                          fileName: /test2/Cassandra2020The20Definitive20Guide.2030947496.pdf
                          fileSource: ""
                          ipAddress: 185.223.113.224
                          operation: PASS
                          protocol: web
                          sessionId: 5da9b4a8bd961dfa0a56fa0dc15aaffe57069271b389e
                          status: "-"
                          username: exavault
                        id: 12345
                        type: sessionActivity
                    responseStatus: 200
                    returnedResults: 2
                    totalResults: 2
              schema:
                $ref: "#/components/schemas/SessionActivityResponse"
          description: Successful operation
      summary: Get activity logs
      tags:
        - Activity
  /activity/webhooks:
    get:
      description: |
        Returns the webhook logs for your account. Use the available query parameters to filter the listing of activity that is returned.

        **NOTE:** Total Results will always return as 0 to avoid querying data you're not using and stay as performant as possible.

        **Event Types**

        Webhooks are triggered by enabled event types for your account, which are configured on the [developer settings page](/docs/account/09-settings/06-developer-settings). Not all event types may be allowed for your account type. These are the valid options for event types:

        - resources.upload
        - resources.download
        - resources.delete
        - resources.createFolder
        - resources.rename
        - resources.move
        - resources.copy
        - resources.compress
        - resources.extract
        - shares.formSubmit
      operationId: getWebhookLogs
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: Earliest date of entries to include in list
          in: query
          name: startDate
          schema:
            format: date-time
            type: string
        - description: Latest date of entries to include in list
          in: query
          name: endDate
          schema:
            format: date-time
            type: string
        - description: Webhook listener endpoint
          in: query
          name: endpointUrl
          schema:
            format: uri
            type: string
        - description: Type of activity that triggered the webhook attempt
          in: query
          name: event
          schema:
            example: resources.upload
            type: string
        - description: Response code from the webhook endpoint
          example: 200
          in: query
          name: statusCode
          schema:
            example: 200
            type: integer
        - description: Path of the resource that triggered the webhook attempt
          example: /folder*
          in: query
          name: resourcePath
          schema:
            example: /Production
            type: string
        - description: Filter by triggering username.
          in: query
          name: username
          schema:
            example: exampleuser
            type: string
        - description: Records to skip before returning results.
          example: 100
          in: query
          name: offset
          schema:
            minimum: 0
            type: integer
        - description: Limit of the records list
          example: 10
          in: query
          name: limit
          schema:
            example: 100
            type: integer
        - description: Comma separated list sort params
          example: -date,event
          in: query
          name: sort
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      attempt: 1
                      created: 2020-07-30T03:40:35-07:00
                      endpointUrl: https://example.com/api/webhook
                      event: Upload
                      response: ""
                      responseSize: 0
                      status: 200
                    id: 2602725
                    type: webhookActivity
                responseStatus: 200
                returnedResults: 1
                totalResults: 1469
              schema:
                $ref: "#/components/schemas/WebhookActivityResponse"
          description: Successful operation
      summary: Get webhook logs
      tags:
        - Activity
    parameters: []
  /email-lists:
    get:
      description: List all email groups for authenticated user
      operationId: getEmailLists
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Related record types to include in the response. Valid option is \`ownerUser\`
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      created: 2020-07-30T10:09:05-07:00
                      emails:
                        - exavault@example.com
                        - exavault+1@example.com
                      modified: 2020-07-30T10:09:05-07:00
                      name: ExaVault Test
                    id: 27
                    relationships:
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                    type: emailList
                included:
                  - attributes:
                      accessTimestamp: 0000-00-00T00:00:00+00:00
                      accountName: example-acct
                      created: 2020-09-02T18:54:14-07:00
                      email: example@exavault-example.com
                      expiration: 2021-12-31 11:59:59
                      firstLogin: null
                      homeDir: /
                      modified: 2020-09-02T18:54:14-07:00
                      nickname: example-user
                      onboarding: false
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: admin
                      status: 1
                      timeZone: America/Los_Angeles
                      username: example-user
                    id: 124437
                    type: user
                responseStatus: 200
                returnedResults: 1
                totalResults: 1
              schema:
                $ref: "#/components/schemas/EmailListCollectionResponse"
          description: Successful operation
      summary: Get all email groups
      tags:
        - Email Lists
    post:
      description: Create a new email list. Among other things, email lists can be used to send files or share folders with a group of email addresses at once.
      operationId: addEmailList
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            example:
              value:
                emails:
                  - exavault@example.com
                  - exavault+1@example.com
                name: ExaVault Test
            schema:
              properties:
                emails:
                  description: "Array of email addresses to include in the email list. "
                  example:
                    - johns@example.com
                    - jdoe@example.com
                  items:
                    type: string
                  type: array
                name:
                  description: "Name of the email list. "
                  example: My friends list
                  type: string
              required:
                - name
                - emails
              title: AddEmailListRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    created: 2020-07-30T10:09:05-07:00
                    emails:
                      - exavault@example.com
                      - exavault+1@example.com
                    modified: 2020-07-30T10:09:05-07:00
                    name: ExaVault Test
                  id: 27
                  relationships:
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                  type: emailList
                included: []
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/EmailListResponse"
          description: Successful operation
      summary: Create new email list
      tags:
        - Email Lists
  "/email-lists/{id}":
    delete:
      description: "Permanently delete an email group. This action is not reversible. We recommend making a user confirm this action before sending the API call. "
      operationId: deleteEmailListById
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the email list to delete
          in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        "200":
          content:
            application/json:
              example:
                data: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful Operation
      summary: Delete an email group with given id
      tags:
        - Email Lists
    get:
      description: Retrieve all the details of a specific email list including it's name, when it was created and all the email addresses that belong to the group.
      operationId: getEmailListById
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the email list to return.
          in: path
          name: id
          required: true
          schema:
            type: integer
        - description: Related record types to include in the response. Valid option is \`ownerUser\`
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    created: 2019-09-02T18:58:07-07:00
                    emails:
                      - test1@example.com
                      - test2@example.com
                    name: My Test List
                  id: 29
                  relationships:
                    ownerUser:
                      data:
                        id: 125391
                        type: user
                  type: emailList
                included:
                  - attributes:
                      accessTimestamp: 0000-00-00T00:00:00+00:00
                      accountName: example-acct
                      created: 2020-09-02T18:54:14-07:00
                      email: admin@exavault-example.com
                      expiration: null
                      firstLogin: null
                      homeDir: /
                      modified: 2020-09-02T18:54:14-07:00
                      nickname: example-admin
                      onboarding: false
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: admin
                      status: 1
                      timeZone: America/Los_Angeles
                      username: example-admin
                    id: 125391
                    type: user
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmailListResponse"
          description: Successful Operation
      summary: Get individual email group
      tags:
        - Email Lists
    patch:
      description: |-
        Add or remove emails from an email list that can be used to send and share files with groups.

        **Notes**

        *This call will **replace** your current email list in its entirety.* If you want to keep any existing emails on the list, be sure to submit the call with any current emails you want to keep on the list.
      operationId: updateEmailListById
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the email list to update.
          in: path
          name: id
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            example:
              emails:
                - test@example.com
                - test+1@example.com
                - newaddress@example.com
              name: Renamed Test Email List
            schema:
              properties:
                emails:
                  description: Email addresses that replace existing list.
                  example:
                    - yuk@example.com
                    - jdoe@example.com
                  items:
                    type: string
                  type: array
                name:
                  description: Name of the email list.
                  example: My friends list
                  type: string
              title: UpdateEmailListRequestBody
              type: object
        description: ""
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    created: 2020-09-03T11:10:55-07:00
                    emails:
                      - test@example.com
                      - test+1@example.com
                      - newaddress@example.com
                    modified: 2020-09-03T11:36:05-07:00
                    name: Renamed Test Email List
                  id: 33
                  relationships:
                    ownerUser:
                      data:
                        id: 125391
                        type: user
                  type: emailList
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmailListResponse"
          description: Successful Operation
      summary: Update an email group
      tags:
        - Email Lists
  /email/referral:
    post:
      description: "Invite a friend to sign up for a free trial of ExaVault. Send a [referral](/lp/referafriend/) email to an email address. If the recipient signs up for ExaVault, we'll apply a credit to your account for the referral. "
      operationId: sendReferralEmail
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  emails:
                    - user@example.com
                  message: I use ExaVault for secure file sending, and so should you. Follow my link to sign up for a trial.
            schema:
              properties:
                emails:
                  items:
                    format: email
                    type: string
                  type: array
                message:
                  example: I use ExaVault for secure file sending, and so should you. Follow my link to sign up for a trial.
                  type: string
              required:
                - emails
                - message
              title: SendReferralEmailRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data: []
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful Operation
      summary: Send referral email to a given address
      tags:
        - Email
  "/email/welcome/{username}":
    post:
      description: Send a welcome email to a user. The contents of the welcome email can be set by [PATCH /accounts](#operation/updateAccount).
      operationId: sendWelcomeEmail
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: A username to send the welcome email to.
          example: exampleuser
          in: path
          name: username
          required: true
          schema:
            type: string
      responses:
        "201":
          content:
            application/json:
              example:
                data: []
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful operation
      summary: Resend welcome email to specific user
      tags:
        - Email
  /forms:
    get:
      description: |
        Get the information for the [file upload form](/docs/account/05-file-sharing/05-form-builder) assigned to a [receive folder](/docs/account/05-file-sharing/04-receive-folders) by its shareHash. The form details will return all the input field settings and the CSS for the form.

        Use the \`include\` parameter (with the value **share**) to also get the details of the associated receive folder.

        **Note**

        - If you prefer to find a form by its ID, you can use the [GET /forms/{id}](#operation/getFormById) endpoint instead.
      operationId: getFormByShareHash
      parameters:
        - description: API key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access Token required to make the API call.
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Share hash to retrieve the form for.
          in: query
          name: shareHash
          required: true
          schema:
            type: string
        - description: Related record types to include in the response. Valid option is **share**
          in: query
          name: include
          schema:
            enum:
              - share
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    cssStyles: |-
                      #ev-widget-form {
                        /*Change this to change the font. Remove to use your website font*/
                        font-family: Helvetica Neue, sans-serif;
                        /*Makes the form the same width as your website */
                        margin: 0 -2%;
                      }
                      #ev-widget-form label{
                        width: 100%;
                      }
                      #ev-widget-form input,
                      #ev-widget-form textarea {
                        /*Changes color and thickness of borders on form elements */
                        border: 2px solid #ccc;
                        /*Changes spacing inside the form elements (top/bottom and left/right */
                        padding: 5px 5px;
                        /* Changes how far away the inputs are from their label */
                        margin-top: 2px;
                      }

                      #ev-widget-form input:focus,
                      #ev-widget-form textarea:focus {
                        /*Changes the color of the form elements when they are clicked in to */
                        border: 2px solid #b2cf88;
                        /*Removes glow effect from form elements that are clicked in to */
                        outline: none;
                      }

                      #ev-widget-form label {
                        font-size: 14px;
                        font-weight: bold;
                        /*Changes color of labels */
                        color: #232323
                      }

                      #ev-widget-form .ev-form-element-description {
                        /*Changes size of descriptions */
                        font-size: 12px;
                        /*Changes color of descriptions */
                        color: #777;
                        /* Changes how far away the descriptions are from their input */
                        margin-top: 2px;
                      }

                      #ev-widget-form textarea {
                        /* Makes textareas (multiline inputs) a taller. */
                        min-height: 90px;
                      }
                    elements:
                      - id: 2329
                        name: Your Name
                        order: 0
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: name
                      - id: 2331
                        name: Email Address
                        order: 1
                        settings:
                          description: null
                          isRequired: true
                          senderEmail: false
                          useAsFolderName: true
                          width: 1
                        type: email
                      - id: 2333
                        name: Subject
                        order: 2
                        settings:
                          description: null
                          isRequired: true
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: text
                      - id: 2335
                        name: Message
                        order: 3
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: textarea
                      - id: 2337
                        name: Upload Area
                        order: 4
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: upload_area
                    formDescription: null
                    submitButtonText: Send Files
                    successMessage: Your files were uploaded
                  id: 459
                  relationships:
                    share:
                      data:
                        id: 1581
                        type: share
                  type: form
                included:
                  - attributes:
                      accessDescription: Receive folder
                      accessMode:
                        delete: false
                        download: false
                        modify: false
                        upload: true
                      assets:
                        - HomeTest
                      created: 2020-07-30T06:24:33-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: 459
                      hasNotification: true
                      hasPassword: false
                      hash: 1a6-eel4wett
                      inherited: null
                      messages: []
                      modified: 2020-07-30T06:27:12-07:00
                      name: HomeTest
                      ownerHash: 1a6-eel4wegt-9t0xc3jb
                      paths:
                        - /HomeTest
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: receive
                    id: 1581
                    type: share
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/FormResponse"
          description: successful operation
      summary: Get receive folder form settings
      tags:
        - Form
  "/forms/entries/{id}":
    delete:
      description: |
        Deletes a form submission entry, which represents one time that a visitor filled out the form and uploaded files. This deletes only the record of the submission (the date, the values entered in the form and the names of the files uploaded by the visitor).The share and any associated file resources will not be deleted by this.

        **Notes**:

        - Use the [GET /form/entries/{formId}](#operation/getFormMessageById) to list the submissions and obtain the ID of the entry you want to delete
        - You must have the [DeleteFormData permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) in order to use this operation
        - It is not possible to un-delete data that is removed in this way
      operationId: deleteFormMessageById
      parameters:
        - description: "API Key required to make the API call. "
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the entry to be deleted data for
          in: path
          name: id
          required: true
          schema:
            format: int64
            type: integer
      responses:
        "200":
          content:
            application/json:
              example:
                data: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful operation
      summary: Delete a receive form submission
      tags:
        - Form
    get:
      description: |
        Returns the form data entries for a specific form for a receive. Optional parameters can be included in the call to manage larger data sets.
      operationId: getFormEntries
      parameters:
        - description: "API Key required to make the API call. "
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the form to retrieve entries for.
          in: path
          name: id
          required: true
          schema:
            type: integer
        - description: Limit of records to be returned (for pagination)
          example: 10
          in: query
          name: limit
          schema:
            type: integer
        - description: Current offset of records (for pagination)
          example: 100
          in: query
          name: offset
          schema:
            type: integer
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      created: 2020-09-15T05:36:41-07:00
                      fields:
                        - name: Email Address
                          order: 1
                          value: test451@example.com
                      modified: 2020-09-16T05:36:44-07:00
                      paths:
                        - /example/test451@example.com/1.csv
                        - /example/test451@example.com/2.csv
                      status: completed
                    id: 320721
                    type: formEntry
                  - attributes:
                      created: 2020-09-16T05:36:41-07:00
                      fields:
                        - name: Email Address
                          order: 1
                          value: test455@example.com
                      modified: 2020-09-17T05:36:44-07:00
                      paths:
                        - /example/test455@example.com/1.csv
                        - /example/test455@example.com/2.csv
                      status: completed
                    id: 32021
                    type: formEntry
                responseStatus: 200
                returnedResults: 2
                totalResults: 2
              schema:
                $ref: "#/components/schemas/FormEntryResponse"
          description: Successful operation
      summary: Get form data entries for a receive
      tags:
        - Form
  "/forms/{id}":
    get:
      description: |
        Returns the [file upload form](/docs/account/05-file-sharing/05-form-builder) assigned to a [receive folder](/docs/account/05-file-sharing/04-receive-folders). The form details will return all the input fields and their settings.

        Use the \`include\` parameter (with the value **share**) to also retrieve the details of the associated receive folder.

        **Note**

        If you prefer to find a form by its shareHash, you can use the [GET /forms](#operation/getFormByShareHash) endpoint instead.
      operationId: getFormById
      parameters:
        - description: API key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access Token required to make the API call.
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Enter "**share**" to get information about associated receive folder.
          in: query
          name: include
          schema:
            example: share
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    cssStyles: |-
                      #ev-widget-form {
                        /*Change this to change the font. Remove to use your website font*/
                        font-family: Helvetica Neue, sans-serif;
                        /*Makes the form the same width as your website */
                        margin: 0 -2%;
                      }
                      #ev-widget-form label{
                        width: 100%;
                      }
                      #ev-widget-form input,
                      #ev-widget-form textarea {
                        /*Changes color and thickness of borders on form elements */
                        border: 2px solid #ccc;
                        /*Changes spacing inside the form elements (top/bottom and left/right */
                        padding: 5px 5px;
                        /* Changes how far away the inputs are from their label */
                        margin-top: 2px;
                      }

                      #ev-widget-form input:focus,
                      #ev-widget-form textarea:focus {
                        /*Changes the color of the form elements when they are clicked in to */
                        border: 2px solid #b2cf88;
                        /*Removes glow effect from form elements that are clicked in to */
                        outline: none;
                      }

                      #ev-widget-form label {
                        font-size: 14px;
                        font-weight: bold;
                        /*Changes color of labels */
                        color: #232323
                      }

                      #ev-widget-form .ev-form-element-description {
                        /*Changes size of descriptions */
                        font-size: 12px;
                        /*Changes color of descriptions */
                        color: #777;
                        /* Changes how far away the descriptions are from their input */
                        margin-top: 2px;
                      }

                      #ev-widget-form textarea {
                        /* Makes textareas (multiline inputs) a taller. */
                        min-height: 90px;
                      }
                    elements:
                      - id: 2329
                        name: Your Name
                        order: 0
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: name
                      - id: 2331
                        name: Email Address
                        order: 1
                        settings:
                          description: null
                          isRequired: true
                          senderEmail: false
                          useAsFolderName: true
                          width: 1
                        type: email
                      - id: 2333
                        name: Subject
                        order: 2
                        settings:
                          description: null
                          isRequired: true
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: text
                      - id: 2335
                        name: Message
                        order: 3
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: textarea
                      - id: 2337
                        name: Upload Area
                        order: 4
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: upload_area
                    formDescription: test test
                    submitButtonText: Send Files
                    successMessage: Your files were uploaded
                  id: 459
                  relationships:
                    share:
                      data:
                        id: 1581
                        type: share
                  type: form
                included:
                  - attributes:
                      accessDescription: Receive folder
                      accessMode:
                        delete: false
                        download: false
                        modify: false
                        upload: true
                      assets:
                        - HomeTest
                      created: 2020-07-30T06:24:33-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: 459
                      hasNotification: true
                      hasPassword: false
                      hash: 1a6-eel4nxrt
                      inherited: null
                      messages: []
                      modified: 2020-07-30T07:39:42-07:00
                      name: HomeTest
                      ownerHash: 1a6-eel4nxrt-9t0xc3jb
                      paths:
                        - /HomeTest
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: receive
                    id: 1581
                    type: share
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/FormResponse"
          description: successful operation
      summary: Get receive folder form by Id
      tags:
        - Form
    parameters:
      - description: Form unique ID number.
        in: path
        name: id
        required: true
        schema:
          format: int32
          type: integer
    patch:
      description: |-
        Add, update, or delete a form's parameters. This will alter how your users/customers will see and interact with the form when sending you files.

        **Notes**

        *This call will **replace** your current form in its entirety.* If you want to keep any existing elements unchanged, be sure to submit the call with an element's current settings to preserve them.
      operationId: updateFormById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            example:
              elements:
                - name: Name
                  order: 0
                  settings:
                    description: this is a description test
                    isRequired: true
                    senderEmail: false
                    useAsFolderName: false
                    width: 1
                  type: name
                - id: 2331
                  name: Email Address
                  order: 1
                  settings:
                    description: null
                    isRequired: true
                    senderEmail: false
                    useAsFolderName: false
                    width: 1
                  type: email
                - id: 2333
                  name: Subject
                  order: 2
                  settings:
                    description: null
                    isRequired: true
                    senderEmail: false
                    useAsFolderName: false
                    width: 1
                  type: text
                - id: 2335
                  name: Message
                  order: 3
                  settings:
                    description: null
                    isRequired: false
                    senderEmail: false
                    useAsFolderName: false
                    width: 1
                  type: textarea
                - id: 2337
                  name: Upload Area
                  order: 4
                  settings:
                    description: null
                    isRequired: false
                    senderEmail: false
                    useAsFolderName: false
                    width: 1
                  type: upload_area
              formDescription: hello world
              submitButtonText: goodbye world
              successMessage: thank you
            schema:
              description: CSS Styles of the form.
              properties:
                cssStyles:
                  example: |-
                    #ev-widget-form {
                      /*Change this to change the font. Remove to use your website font*/
                      font-family: Helvetica Neue, sans-serif;
                      /*Makes the form the same width as your website */
                      margin: 0 -2%;
                    }
                    #ev-widget-form label{
                      width: 100%;
                    }
                    #ev-widget-form input,
                    #ev-widget-form textarea {
                      /*Changes color and thickness of borders on form elements */
                      border: 2px solid #ccc;
                      /*Changes spacing inside the form elements (top/bottom and left/right */
                      padding: 5px 5px;
                      /* Changes how far away the inputs are from their label */
                      margin-top: 2px;
                    }

                    #ev-widget-form input:focus,
                    #ev-widget-form textarea:focus {
                      /*Changes the color of the form elements when they are clicked in to */
                      border: 2px solid #b2cf88;
                      /*Removes glow effect from form elements that are clicked in to */
                      outline: none;
                    }

                    #ev-widget-form label {
                      font-size: 14px;
                      font-weight: bold;
                      /*Changes color of labels */
                      color: #232323
                    }

                    #ev-widget-form .ev-form-element-description {
                      /*Changes size of descriptions */
                      font-size: 12px;
                      /*Changes color of descriptions */
                      color: #777;
                      /* Changes how far away the descriptions are from their input */
                      margin-top: 2px;
                    }

                    #ev-widget-form textarea {
                      /* Makes textareas (multiline inputs) a taller. */
                      min-height: 90px;
                    }
                  type: string
                elements:
                  items:
                    properties:
                      id:
                        description: ID of the form element. If you're adding a new element to the form, do not include this field.
                        example: 123
                        type: integer
                      name:
                        description: Name of the form element.
                        example: Your name
                        type: string
                      order:
                        description: "The order the fields will be displayed to the recipient. Starts at 0. "
                        example: 0
                        type: integer
                      settings:
                        properties:
                          isRequired:
                            description: "True is the form element is required for submission. "
                            example: true
                            type: boolean
                          senderEmail:
                            example: false
                            type: boolean
                          useAsFolderName:
                            description: "True if the submitted response should be used as the name for the new folder. "
                            example: false
                            type: boolean
                        type: object
                      type:
                        description: Type of form field to use.
                        enum:
                          - name
                          - email
                          - text
                          - textarea
                          - upload_area
                        example: name
                        type: string
                    type: object
                  type: array
                formDescription:
                  description: "Set a description for the form that will be visible to recipients. "
                  example: Send your files
                  type: string
                submitButtonText:
                  description: Text to be displayed on the submission button.
                  example: Send Files
                  type: string
                successMessage:
                  description: "Text to be displayed when a recipient has submitted the form. "
                  example: Your files were uploaded
                  type: string
              title: UpdateFormByIdRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    cssStyles: null
                    elements:
                      - id: 2351
                        name: rename test
                        order: 0
                        settings:
                          description: this is a description test
                          isRequired: "true"
                          senderEmail: false
                          useAsFolderName: "false"
                          width: "1"
                        type: name
                      - id: 2331
                        name: Email Address
                        order: 1
                        settings:
                          description: null
                          isRequired: true
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: email
                      - id: 2333
                        name: Subject
                        order: 2
                        settings:
                          description: null
                          isRequired: true
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: text
                      - id: 2335
                        name: Message
                        order: 3
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: textarea
                      - id: 2337
                        name: Upload Area
                        order: 4
                        settings:
                          description: null
                          isRequired: false
                          senderEmail: false
                          useAsFolderName: false
                          width: 1
                        type: upload_area
                    formDescription: hello world
                    submitButtonText: goodbye world
                    successMessage: thank you
                  id: 459
                  relationships:
                    share:
                      data:
                        id: 1581
                        type: share
                  type: form
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/FormResponse"
          description: Successful Operation
      summary: Updates a form with given parameters
      tags:
        - Form
  /notifications:
    get:
      description: |-
        Get a list of all the [notifications](/docs/account/06-notifications) you have access to. You can use sorting and filtering to limit the returned list.

        **Notes:**
          - Authenticated user should have [notifications permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions)
      operationId: listNotifications
      parameters:
        - description: "API Key required to make the API call. "
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: |-
            Type of notification include in the list. Valid options are **file**, **folder**, **send_receipt**, **share_receipt**, **file_drop**

            If this parameter is not used, only **file** and **folder** type notifications are included in the list.
          example: file
          in: query
          name: type
          schema:
            enum:
              - file
              - folder
              - shared_folder
              - send_receipt
              - share_receipt
              - file_drop
            type: string
        - description: Starting notification record in the result set. Can be used for pagination.
          example: 50
          in: query
          name: offset
          required: false
          schema:
            default: 0
            format: int32
            type: integer
        - description: |-
            What order the list of matches should be in. Valid sort fields are **resourcename**, **date**, **action** and **type**. The sort order for each sort field is ascending unless it is prefixed with a minus (“-“), in which case it will be descending.

            You can chose multiple options for the sort by separating them with commmas, such as "type,-date" to sort by type, then most recent.
          example: date
          in: query
          name: sort
          required: false
          schema:
            type: string
        - description: Number of notification records to return. Can be used for pagination.
          example: 100
          in: query
          name: limit
          required: false
          schema:
            default: 25
            format: int32
            type: integer
        - description: Related records to include in the response. Valid options are **ownerUser**, **resource**, **share**
          example: resource,share,user
          in: query
          name: include
          schema:
            enum:
              - resource
              - share
              - user
            type: string
        - description: |-
            The kind of action which triggers the notification. Valid choices are **connect** (only for delivery receipts), **download**, **upload**, **delete**, or **all**

            **Note** The **all** action matches notifications set to "all", not all notifications. For example, notifications set to trigger only on delete are not included if you filter for action=all
          in: query
          name: action
          schema:
            enum:
              - connect
              - download
              - upload
              - delete
              - all
            example: all
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      action: all
                      created: 2020-07-29T09:53:17-07:00
                      message: null
                      modified: 2020-07-29T09:53:17-07:00
                      name: /Test
                      path: /Test
                      readableDescription: anybody uploads to, downloads from or deletes from '/Test'
                      readableDescriptionWithoutPath: anybody uploads to or downloads from this folder
                      recipientEmails:
                        - exavault@example.com
                      recipients:
                        - created: 2020-07-29T19:51:21-07:00
                          email: exavault@example.com
                          id: null
                          modified: 2020-07-29T19:51:21-07:00
                          notificationId: null
                      sendEmail: true
                      type: folder
                      usernames:
                        - exavaultuser
                    id: 1117
                    relationships:
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      resource:
                        data:
                          id: 2554051
                          type: resource
                    type: notification
                included: []
                responseStatus: 200
                returnedResults: 1
                totalResults: 1
              schema:
                $ref: "#/components/schemas/NotificationCollectionResponse"
          description: Successful Operation
      summary: Get a list of notifications
      tags:
        - Notifications
    post:
      description: |
        Create a new notification for a [resource](#section/Identifying-Resources) in your account. Notifications can be sent via email or webhook;

        - To enable email, pass an array of email addresses to the \`recipients\` parameter of this call.
        - To enable webhooks, setup the webhook callback URL in your account settings via [PATCH /account](#operation/updateAccount).

        **Notes:**
          - Authenticated user should have [notifications permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions)
      operationId: addNotification
      parameters:
        - description: "API Key required to make API call. "
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  action: upload
                  message: hello world
                  recipients:
                    - myemail@example.com
                  resource: examplefile.txt
                  sendEmail: true
                  type: file
                  usernames:
                    - exavault
                    - exavalut2
            schema:
              properties:
                action:
                  description: Type of action be notified about. Notifications will only be fired for the given type of action. Valid choices are **upload**, **download**, **delete** or **all** (upload/download/delete)
                  enum:
                    - upload
                    - download
                    - delete
                    - all
                  example: upload
                  type: string
                message:
                  description: Custom message to include in notification emails.
                  type: string
                recipients:
                  description: Email addresses to send notification emails to. If not specified, sends to the current user's email address.
                  example:
                    - myemail@example.com
                  items:
                    format: email
                    type: string
                  type: array
                resource:
                  description: Resources for this notification. See details on [how to specify resources](#section/Identifying-Resources) above.
                  type: string
                sendEmail:
                  description: Set to true if the user should be notified by email when the notification is triggered.
                  example: true
                  type: boolean
                type:
                  description: |-
                    What kind of notification you're making. Valid choices are:

                    - **file** to monitor activity for a file resource
                    - **folder** to monitor activity for a folder resource
                  enum:
                    - file
                    - folder
                  example: file
                  type: string
                usernames:
                  description: |-
                    Determines which users' actions should trigger the notification.

                    Rather than listing  individual users, you can also use 3 special options:

                    - **notice\_user\_all** for activity by any user or share recipient
                    - **notice\_user\_all\_users** for activity only by user accounts
                    - **notice\_user\_all\_recipient** for activity only by share recipients
                  items:
                    type: string
                  type: array
              required:
                - type
                - resource
                - action
                - usernames
                - sendEmail
              title: AddNotificationRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    action: upload
                    created: 2020-07-29T20:15:09-07:00
                    message: null
                    modified: 2020-07-29T20:15:09-07:00
                    name: /Test
                    path: /Test
                    readableDescription: anybody uploads to '/Test'
                    readableDescriptionWithoutPath: anybody uploads to this folder
                    recipients:
                      - created: 2020-07-29T20:15:09-07:00
                        email: exavault@example.com
                        id: 81
                        modified: 2020-07-29T20:15:09-07:00
                        notificationId: 1143
                      - created: 2020-07-29T20:15:09-07:00
                        email: exavault@example.com
                        id: 83
                        modified: 2020-07-29T20:15:09-07:00
                        notificationId: 1143
                    sendEmail: false
                    type: folder
                    usernames:
                      - exavaultuser
                  id: 1143
                  relationships:
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    resource:
                      data:
                        id: 2554051
                        type: resource
                  type: notification
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/NotificationResponse"
          description: Successful Operation
      summary: Create a new notification
      tags:
        - Notifications
  "/notifications/{id}":
    delete:
      description: |-
        Deletes a notification. Note that deleting a notification _only_ deletes the notification &ndash; it does not delete any underlying files or folders.

        **Notes:**

        - You need to have the [notifications permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to update a notification.
        - You can only delete notifications owned by your user account.
      operationId: deleteNotificationById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the notification. Use [GET /notifications](#operation/listNotifications) if you need to lookup an ID.
          example: 3
          in: path
          name: id
          required: true
          schema:
            format: int32
            type: integer
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful Operation
      summary: Delete a notification
      tags:
        - Notifications
    get:
      description: |-
        Get the details for a notification with a specific ID number. You'll be able to review its path, triggers and who's getting the notification.

        **Notes**

        - You need to have the [notifications permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to view the detail for a notification.
        - You can only retrieve notifications owned by your user account.
      operationId: getNotificationById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the notification. Use [GET /notifications](#operation/listNotifications) if you need to lookup an ID.
          example: 3
          in: path
          name: id
          required: true
          schema:
            type: integer
        - description: Related record types to include in the response. You can include multiple types by separating them with commas. Valid options are **ownerUser**, **resource**, and **share**.
          example: resource,share
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    action: upload
                    created: 2020-07-29T20:15:09-07:00
                    message: null
                    modified: 2020-07-29T20:15:09-07:00
                    name: /Test
                    path: /Test
                    readableDescription: anybody uploads to '/Test'
                    readableDescriptionWithoutPath: anybody uploads to this folder
                    recipients:
                      - created: 2020-07-29T20:15:09-07:00
                        email: exavault@example.com
                        id: 81
                        modified: 2020-07-29T20:15:09-07:00
                        notificationId: 1143
                      - created: 2020-07-29T20:15:09-07:00
                        email: exavault+1@example.com
                        id: 83
                        modified: 2020-07-29T20:15:09-07:00
                        notificationId: 1143
                    sendEmail: false
                    type: folder
                    usernames:
                      - exavaultuser
                  id: 1143
                  relationships:
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    resource:
                      data:
                        id: 2554051
                        type: resource
                  type: notification
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/NotificationResponse"
          description: Successful Operation
      summary: Get notification details
      tags:
        - Notifications
    patch:
      description: |-
        Update an existing notification. You can add additional emails or change the action or users that cause a notification to trigger.

        When updating recipient emails, make sure your \`recipients\` parameter contains the full list of people who should be included on the notification. If you resend the list without an existing recipient, they will be deleted from the notification emails.

        **Notes:**

        - You need to have the [notifications permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to update a notification.
        - You can only change notifications owned by your user account.
      operationId: updateNotificationById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the notification. Use [GET /notifications](#operation/listNotifications) if you need to lookup an ID.
          example: 3
          in: path
          name: id
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            examples:
              Example Body:
                value:
                  action: upload
                  emails:
                    - exavault@example.com
                    - exavault+1@example.com
                  sendEmail: "true"
                  usernames:
                    - notice_user_all_recipients
            schema:
              properties:
                action:
                  description: Type of action be notified about. Notifications will only be sent for the given type of action. Valid choices are **upload**, **download**, **delete** or **all** (upload/download/delete)
                  enum:
                    - upload
                    - download
                    - delete
                    - all
                  example: all
                  type: string
                message:
                  description: Custom message to insert into the notification emails, along with the matching activity.
                  type: string
                recipients:
                  description: Email addresses to send notification emails to. If empty, sends to the current user's email address.
                  example:
                    - myemail@example.com
                  items:
                    format: email
                    type: string
                  type: array
                sendEmail:
                  description: Whether an email should be sent to the recipients when matching activity happens.
                  example: true
                  type: boolean
                usernames:
                  description: |-
                    Determines which users' actions should trigger the notification.

                    Rather than listing  individual users, you can also use 3 special options:

                    - **notice\_user\_all** for activity by any user or share recipient
                    - **notice\_user\_all\_users** for activity only by user accounts
                    - **notice\_user\_all\_recipients** for activity only by share recipients
                  example:
                    - notice_user_all
                  items:
                    type: string
                  type: array
              title: UpdateNotificationByIdRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    action: all
                    created: 2020-07-29T20:15:09-07:00
                    message: null
                    modified: 2020-07-29T20:15:09-07:00
                    name: /Test
                    path: /Test
                    readableDescription: anybody uploads to, downloads from or deletes from '/Test'
                    readableDescriptionWithoutPath: anybody uploads to or downloads from this folder
                    recipients:
                      - created: 2020-07-30T06:01:09-07:00
                        email: exavault@example.com
                        id: 85
                        modified: 2020-07-30T06:01:09-07:00
                        notificationId: 1143
                      - created: 2020-07-30T06:01:09-07:00
                        email: exavault+1@example.com
                        id: 87
                        modified: 2020-07-30T06:01:09-07:00
                        notificationId: 1143
                    sendEmail: false
                    type: folder
                    usernames:
                      - exavalutuser
                  id: 1143
                  relationships:
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    resource:
                      data:
                        id: 2554051
                        type: resource
                  type: notification
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/NotificationResponse"
          description: Successful Operation
      summary: Update a notification
      tags:
        - Notifications
  "/recipients/shares/invites/{shareId}":
    post:
      description: |-
        Resend invitations to one or all recipients attached to specified share. The most recent message that was sent for the share will be re-used for this email.

        You can use [GET /shares/{id}](#operation/getShareById) to view the recipient list and message history for a share. Use [PATCH /shares/{id}](#operation/updateShareById) to add or remove recipients.
      operationId: resendInvitationsForShare
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the share to resend invites for.
          in: path
          name: shareId
          required: true
          schema:
            type: integer
      requestBody:
        content:
          application/json:
            examples:
              example-1:
                value:
                  recipientId: 0
            schema:
              properties:
                recipientId:
                  description: ID number of recipient to send a new invitation to.
                  format: int32
                  type: integer
              title: ResendInvitationsRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  - test+3@example.com
                  - test+4@example.com
                  - test+5@example.com
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/ShareRecipientsResponse"
          description: Successful operation
      summary: Resend invitations to share recipients
      tags:
        - Recipients
  /resources:
    delete:
      description: |
        Delete multiple file or folder resourcess. Deleting a folder resource will also delete any resources in that folder.

        **Notes:**
        - Authenticated user should have [delete permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions).
        - It is not possible to un-delete a deleted resource.
      operationId: deleteResources
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  resources:
                    - exampleFile1.txt
                    - exampleFile2.txt
            schema:
              properties:
                resources:
                  description: Resource identifiers of items to delete.
                  items:
                    type: string
                  type: array
              required:
                - resources
              title: DeleteResourcesRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              example:
                data: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful Operation
        "207":
          content:
            application/json:
              example:
                responses:
                  - data:
                      id: 2
                      meta:
                        path: /deletefolder
                      type: resource
                    responseStatus: 200
                  - errors:
                      - code: null
                        detail: null
                        meta:
                          path: /deletefolder2
                        title: null
                    responseStatus: 404
              schema:
                $ref: "#/components/schemas/ResourceMultiResponse"
          description: Multi Response
      summary: Delete Resources
      tags:
        - Resources
    get:
      description: |
        Returns details for specified file/folder id or hash, including upload date, size and type. For the full list of returned properties, see the response syntax, below.

        **Notes:**
        - Authenticated user should have list permission.
      operationId: getResourceInfo
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Resource identifier of the file or folder to get metadata for.
          in: query
          name: resource
          required: true
          schema:
            type: string
        - description: Comma separated list of relationships to include in response. Possible values are **share**, **notifications**, **directFile**, **parentResource**, **ownerUser**, **ownerUser**.
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessedAt: 2020-07-29T09:53:36-07:00
                    createdAt: 2020-07-28T15:59:23-07:00
                    createdBy: exavaultuser
                    extension: ""
                    fileCount: 2
                    hash: 7a2abd9f90ce196hf3f650c612372c0b
                    name: Test
                    path: /Test
                    previewable: false
                    size: 33415
                    type: dir
                    updatedAt: 2020-07-29T09:52:47-07:00
                    uploadDate: 2020-07-28T15:59:23-07:00
                  id: 2554051
                  relationships:
                    directFile:
                      data:
                        id: 101
                        type: directFile
                    notifications:
                      - data:
                          id: 1117
                          type: notification
                    ownerAccount:
                      data:
                        id: 7
                        type: account
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    parentResource:
                      data:
                        id: 103
                        type: resource
                    share:
                      data:
                        id: 1499
                        type: share
                  type: resource
                included:
                  - attributes:
                      accessDescription: Download only
                      accessMode:
                        delete: false
                        download: true
                        modify: false
                        upload: false
                      assets:
                        - Test
                      created: 2020-07-29T08:51:39-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: null
                      hasNotification: false
                      hasPassword: false
                      hash: 17t-eojdhh1j
                      inherited: null
                      messages: []
                      modified: 2020-07-29T09:53:36-07:00
                      name: Test
                      ownerHash: 17t-eojowf1j-sfh242uj
                      paths:
                        - /Test
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: shared_folder
                    id: 1499
                    type: share
                  - attributes:
                      accountId: 7
                      blockUntil: -001-11-29T16:07:02-07:52
                      created: 2020-07-29T09:53:12-07:00
                      isEnabled: true
                      isIndexEnabled: true
                      modified: 2020-07-29T09:53:12-07:00
                      path: /Test
                    id: 101
                    type: directFile
                  - attributes:
                      action: upload
                      created: 2020-07-29T20:15:09-07:00
                      message: null
                      modified: 2020-07-29T20:15:09-07:00
                      name: /Test
                      path: /Test
                      readableDescription: anybody uploads to '/Test'
                      readableDescriptionWithoutPath: anybody uploads to this folder
                      recipientEmails:
                        - exavault@example.com
                        - exavault+1@example.com
                      recipients:
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault@example.com
                          id: 81
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault+1@example.com
                          id: 83
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                      sendEmail: false
                      type: folder
                      usernames:
                        - exavaultuser
                    id: 1143
                    relationships:
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      resource:
                        data:
                          id: 2554051
                          type: resource
                    type: notification
                  - attributes:
                      accessTimestamp: 2020-07-27 19:32:45
                      accountName: exavault
                      created: 2020-07-24T07:51:12-07:00
                      email: test@example.com
                      expiration: null
                      firstLogin: false
                      homeDir: /
                      modified: 2020-07-24T07:51:13-07:00
                      nickname: exavaultnickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: master
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124419
                    relationships:
                      homeResource:
                        data:
                          id: 2536831
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                  - attributes:
                      accountName: exampleaccount
                      accountOnboarding: true
                      allowedIp: null
                      branding: true
                      clientId: 1
                      complexPasswords: false
                      created: 2019-05-30T20:48:57Z
                      customDomain: false
                      customSignature: null
                      externalDomains: null
                      maxUsers: 5
                      modified: 2019-08-27T01:03:41Z
                      quota:
                        diskLimit: 37580963840
                        diskUsed: 24938382543
                        noticeEnabled: true
                        noticeThreshold: 90
                      secureOnly: false
                      showReferralLinks: true
                      status: 1
                      userCount: 4
                      welcomeEmailContent: |
                        "Great news, your new account is ready!\n\nFor your records, we've listed information you'll use to log in below:\n\nFTP Server: [[ftpserver]]\n\nUsername (Web and FTP access): [[username]]\n\n[[setpassword]]"
                      welcomeEmailSubject: ExaVault File Sharing Account
                    id: 7
                    relationships:
                      masterUser:
                        data:
                          id: 1
                          type: user
                    type: account
                  - attributes:
                      accessedAt: 2011-03-21T00:18:56-07:00
                      createdAt: 2011-03-21T00:18:56-07:00
                      createdBy: exampleuser
                      extension: dir
                      fileCount: 3
                      hash: ec4aa9a91be282666a165899a14f29b1
                      name: examplefolder
                      path: /examplefolder
                      previewable: false
                      size: 12321321
                      updatedAt: 2011-03-21T00:18:56-07:00
                      uploadDate: 2011-03-21T00:18:56-07:00
                    id: 2
                    relationships:
                      directFile:
                        data:
                          id: 101
                          type: directFile
                      notifications:
                        - data:
                            id: 1117
                            type: notification
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 103
                          type: resource
                      share:
                        data:
                          id: 1499
                          type: share
                    type: resource
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ResourceResponse"
          description: Successful Operation
      summary: Get Resource Properties
      tags:
        - Resources
    post:
      description: |
        Create a new empty folder at the specified path. New files can be uploaded via the [/resources/upload](#operation/uploadFile) endpoint.

        **Notes:**
        - Authenticated user should have modify permission.
      operationId: addFolder
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example using path:
                value:
                  path: /exavault/exampleFile.txt
              Example without path:
                value:
                  name: exampleFile.txt
                  parentResource: /exavault
            schema:
              properties:
                name:
                  description: Name of the folder to create. Required if **path** is not used
                  type: string
                parentResource:
                  description: Resource identifier where to create a folder. Required if **path** is not used
                  type: string
                path:
                  description: Fully-qualified path to the new folder including folder's name
                  type: string
              title: AddFolderRequestBody
              type: object
        description: ""
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessedAt: 2020-07-29T09:53:36-07:00
                    createdAt: 2020-07-28T15:59:23-07:00
                    createdBy: exavaultuser
                    extension: ""
                    fileCount: 2
                    hash: 7a2hhf9f90ce196de3f650c612372c0b
                    name: Test Folder
                    path: /Test Folder
                    previewable: false
                    size: 33415
                    type: dir
                    updatedAt: 2020-07-29T10:27:08-07:00
                    uploadDate: 2020-07-28T15:59:23-07:00
                  id: 2554051
                  relationships:
                    directFile:
                      data:
                        id: 101
                        type: directFile
                    notifications:
                      - data:
                          id: 1117
                          type: notification
                    ownerAccount:
                      data:
                        id: 7
                        type: account
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    parentResource:
                      data:
                        id: 103
                        type: resource
                    share:
                      data:
                        id: 1499
                        type: share
                  type: resource
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ResourceResponse"
          description: Successful Operation
      summary: Create a folder
      tags:
        - Resources
  /resources/compress:
    post:
      description: |
        Create a zip archive containing the files from given set of paths. Note that this can be a very slow operation if you have indicated many files should be included in the archive.

        **Notes:**
        - Authenticated user should have modify permission.
      operationId: compressFiles
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  archiveName: exampleFiles.zip
                  parentResource: /exavault
                  resources:
                    - exampleFile1.txt
                    - exampleFile2.txt
                    - id:234222
            schema:
              properties:
                archiveName:
                  description: Name of the zip archive to create. If left blank, current date will be used.
                  type: string
                parentResource:
                  description: Resource identifier of the folder where zip archive should be created.
                  type: string
                resources:
                  description: Resource identifiers for file(s)/folder(s) to include in new zip file
                  items:
                    type: string
                  type: array
              required:
                - resources
              title: CompressFilesRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessedAt: 2020-07-29T19:04:09-07:00
                    createdAt: 2020-07-29T19:04:09-07:00
                    createdBy: exavault
                    extension: zip
                    fileCount: null
                    hash: b2d987d4ed9dhh28e3a18adafe59107c
                    name: Compress test.zip
                    path: /Test/Compress test.zip
                    previewable: false
                    size: 33434
                    type: file
                    updatedAt: 2020-07-29T19:04:09-07:00
                    uploadDate: 2020-07-29T19:04:09-07:00
                  id: 2566609
                  relationships:
                    ownerAccount:
                      data:
                        id: 7
                        type: account
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    parentResource:
                      data:
                        id: 2554051
                        type: resource
                  type: resource
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/ResourceResponse"
          description: Successful Operation
      summary: Compress resources
      tags:
        - Resources
  /resources/copy:
    post:
      description: |
        Copies a set of exisiting files/folders (provided by an array \`resources\`) to the requested \`parentResource\` in your account.
        In the \`resources\` array, you may specify paths pointing files/folders throughout the account, but everything will be copied to the
        root of the \`parentResource\`.

        **Notes:**
        - Authenticated user should have modify permission.
      operationId: copyResources
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  parentResource: /exavault/exampleFileFolder
                  resources:
                    - /exavault/exampleFile.txt
                    - /exavault/otherFile.txt
                    - id:28282828
            schema:
              properties:
                parentResource:
                  description: Resource identifier for folder where items will be copied to.
                  type: string
                resources:
                  description: Resource identifier(s) of items to be copied to a new location
                  items:
                    type: string
                  type: array
              required:
                - resources
                - parentResource
              title: CopyResourcesRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              examples:
                $:
                  x-data:
                    attributes:
                      accessedAt: 2020-07-29T12:53:26-07:00
                      createdAt: 2020-07-29T12:53:26-07:00
                      createdBy: exavault
                      extension: jpg
                      fileCount: null
                      hash: f573b417707095b017a26d4e5a2e6dd0
                      name: test.jpg
                      path: /HomeTest/test.jpg
                      previewable: false
                      size: 33415
                      type: file
                      updatedAt: 2020-07-29T12:53:26-07:00
                      uploadDate: 2020-07-29T12:53:26-07:00
                    id: 2563533
                    type: resource
                  x-meta:
                    destinationPath: /HomeTest
                    path: /Test/test.jpg
                  x-responseStatus: 200
                Example:
                  value:
                    data:
                      attributes:
                        accessedAt: 2011-03-21T00:18:56-07:00
                        accessedTime: 0
                        createdAt: 2011-03-21T00:18:56-07:00
                        createdBy: exampleuser
                        createdTime: 0
                        extension: string
                        fileCount: 0
                        hash: ec4aa9a91be282666a165899a14f29b1
                        name: examplefolder
                        path: /examplefolder
                        previewable: true
                        size: 0
                        type: file
                        updatedAt: 2011-03-21T00:18:56-07:00
                        updatedTime: 0
                        uploadDate: 2011-03-21T00:18:56-07:00
                      id: 1
                      relationships:
                        directFile:
                          data:
                            id: 2
                            type: directFile
                        notifications:
                          - data:
                              id: 2
                              type: notification
                        parentResource:
                          data:
                            id: 2
                            type: resource
                        share:
                          data:
                            id: 2345
                            type: share
                      type: resource
                    meta:
                      id: 2321
              schema:
                $ref: "#/components/schemas/ResourceCopyMove"
          description: Successful Operation
        "207":
          content:
            application/json:
              example:
                responses:
                  - data:
                      attributes:
                        accessedAt: 2020-07-29T12:53:26-07:00
                        createdAt: 2020-07-29T12:53:26-07:00
                        createdBy: exavault
                        extension: jpg
                        fileCount: null
                        hash: f573b417707095b017a26d4e5a2e6dd0
                        name: test.jpg
                        path: /HomeTest/test.jpg
                        previewable: false
                        size: 33415
                        type: file
                        updatedAt: 2020-07-29T12:53:26-07:00
                        uploadDate: 2020-07-29T12:53:26-07:00
                      id: 2563533
                      type: resource
                    meta:
                      destinationPath: /HomeTest
                      path: /Test/test.jpg
                    responseStatus: 200
                  - errors:
                      - code: null
                        detail: null
                        meta:
                          destinationPath: /HomeTest
                          path: /Test/test2.jpg
                        title: null
                    responseStatus: 404
              schema:
                $ref: "#/components/schemas/ResourceMultiResponse"
          description: Multi Response
      summary: Copy resources
      tags:
        - Resources
  /resources/download:
    get:
      description: |-
        Downloads a file from the server. Whenever more than one file is being downloaded, the file are first zipped into  a single file before the download starts, and the resulting zip file is named to match the \`downloadArchiveName\` parameter.

        **NOTE**: Downloading many files at once  may result in a long delay before the API will return a response. You may need to override default timeout values in your API client, or download files individually.
      operationId: download
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Path of file or folder to be downloaded, starting from the root. Can also be an array of paths.
          in: query
          name: resources[]
          required: true
          schema:
            items:
              type: string
            type: array
        - description: When downloading multiple files, this will be used as the name of the zip file that is created.
          in: query
          name: downloadArchiveName
          required: false
          schema:
            type: string
      responses:
        "200":
          content:
            application/octet-stream:
              schema:
                format: binary
                type: string
            application/zip:
              schema:
                format: binary
                type: string
          description: Content of the file
      summary: Download a file
      tags:
        - Resources
  /resources/extract:
    post:
      description: |
        Extract the contents of a zip archive to a specified directory. Note that this can be a very slow operation.

        **Notes:**
        - You must have  [modify permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to do this.
      operationId: extractFiles
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  parentResource: /extractFolder
                  resource: /exavault/exampleFiles.zip
            schema:
              properties:
                parentResource:
                  description: Resource identifier for folder files should be extracted to.
                  type: string
                resource:
                  description: Resource identifier of zip archive to be extracted.
                  type: string
              required:
                - resource
                - parentResource
              title: ExtractFilesRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      accessedAt: 2020-07-29T12:50:38-07:00
                      accessedTime: 1596052238
                      createdAt: 2020-07-29T09:52:47-07:00
                      createdBy: exavaultuser
                      createdTime: 1596041567
                      extension: jpg
                      fileCount: null
                      hash: f836b417707583b017a26d4e5a2e6dd0
                      name: test.jpg
                      path: /exavault/test.jpg
                      previewable: false
                      size: 33415
                      type: file
                      updatedAt: 2020-07-29T19:27:31-07:00
                      updatedTime: 1596076051
                      uploadDate: 2020-07-29T09:52:47-07:00
                    id: 2559471
                    relationships:
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 2554051
                          type: resource
                    type: resource
                responseStatus: 201
                returnedResults: 1
                totalResults: 1
              schema:
                $ref: "#/components/schemas/ResourceCollectionResponse"
          description: Successful Operation
      summary: Extract resources
      tags:
        - Resources
  /resources/list:
    get:
      description: |-
        Returns a list of files and folders in the account. Use the \`resource\` query parameter to indicate the folder you wish to search in (which can be /).

        **Searching for Files and Folders**

        Using the \`name\` parameter triggers search mode, which will search the entire directory structure under the provided \`resource\` for files or folders with names matching the provided \`name\`. This supports wildcard matching such as:

        - \*Report\* would find any files or folders with "Report" in the name.
        - Data\_202?-09-30.xlsx would match items such as "Data\_2020-09-30.xlsx", "DATA\_2021-09-30.xlsx", "data\_2022-09-30.xlsx" etc.
        - sales\* would find any files or folders starting with the word "Sales"
        - \*.csv would locate any files ending in ".csv"
        - \* matches everything within the directory tree starting at your given \`resource\`

        The search is not case-sensitive. Searching for Clients\* or clients\* or CLIENTS\*, etc. will provide identical results

        If you are using the \`name\` parameter to run a search, the \`type\` parameter will be ignored by the server.
      operationId: listResources
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Resource identifier to get resources for. Can be path/id/name.
          in: query
          name: resource
          required: true
          schema:
            type: string
        - description: Endpoint support multiple sort fields by allowing array of sort params. Sort fields should be applied in the order specified. The sort order for each sort field is ascending unless it is prefixed with a minus (“-“), in which case it will be descending.
          in: query
          name: sort
          schema:
            example: name
            type: string
        - description: Determines which item to start on for pagination. Use zero (0) to start at the beginning of the list. e.g, setting \`offset=200\` would trigger the server to skip the first 200 matching entries when returning the results.
          in: query
          name: offset
          required: false
          schema:
            default: 0
            format: int32
            type: integer
        - description: The number of files to limit the result. If you have more files in your directory than this limit, make multiple calls, incrementing the \`offset\` parameter, above.
          in: query
          name: limit
          required: false
          schema:
            format: int32
            type: integer
        - description: Limit types of resources returned to "file" or "dir" only. This is ignored if you are using the \`name\` parameter to trigger a search.
          in: query
          name: type
          required: false
          schema:
            type: string
        - description: Text to match resource names. This allows you to filter the results returned. For example, to locate only zip archive files, you can enter \`*zip\` and only resources ending in "zip" will be included in the list of results.
          in: query
          name: name
          schema:
            type: string
        - description: Comma separated list of relationships to include in response. Possible values are **share**, **notifications**, **directFile**, **parentResource**, **ownerUser**, **ownerAccount**.
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      accessedAt: 2011-03-21T00:18:56-07:00
                      createdAt: 2011-03-21T00:18:56-07:00
                      createdBy: exampleuser
                      extension: dir
                      fileCount: 3
                      hash: ec4aa9a91be282666a165899a14f29b1
                      name: examplefolder
                      path: /examplefolder
                      previewable: false
                      size: 12321321
                      updatedAt: 2011-03-21T00:18:56-07:00
                      uploadDate: 2011-03-21T00:18:56-07:00
                    id: 2
                    relationships:
                      directFile:
                        data:
                          id: 101
                          type: directFile
                      notifications:
                        - data:
                            id: 1117
                            type: notification
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 103
                          type: resource
                      share:
                        data:
                          id: 1499
                          type: share
                    type: resource
                included:
                  - attributes:
                      accessDescription: Download only
                      accessMode:
                        delete: false
                        download: true
                        modify: false
                        upload: false
                      assets:
                        - Test
                      created: 2020-07-29T08:51:39-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: null
                      hasNotification: false
                      hasPassword: false
                      hash: 17t-eojdhh1j
                      inherited: null
                      messages: []
                      modified: 2020-07-29T09:53:36-07:00
                      name: Test
                      ownerHash: 17t-eojowf1j-sfh242uj
                      paths:
                        - /Test
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: shared_folder
                    id: 1499
                    type: share
                  - attributes:
                      accountId: 7
                      blockUntil: -001-11-29T16:07:02-07:52
                      created: 2020-07-29T09:53:12-07:00
                      isEnabled: true
                      isIndexEnabled: true
                      modified: 2020-07-29T09:53:12-07:00
                      path: /Test
                    id: 101
                    type: directFile
                  - attributes:
                      action: upload
                      created: 2020-07-29T20:15:09-07:00
                      message: null
                      modified: 2020-07-29T20:15:09-07:00
                      name: /Test
                      path: /Test
                      readableDescription: anybody uploads to '/Test'
                      readableDescriptionWithoutPath: anybody uploads to this folder
                      recipientEmails:
                        - exavault@example.com
                        - exavault+1@example.com
                      recipients:
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault@example.com
                          id: 81
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault+1@example.com
                          id: 83
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                      sendEmail: false
                      type: folder
                      usernames:
                        - exavaultuser
                    id: 1143
                    relationships:
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      resource:
                        data:
                          id: 2554051
                          type: resource
                    type: notification
                  - attributes:
                      accessTimestamp: 2020-07-27 19:32:45
                      accountName: exavault
                      created: 2020-07-24T07:51:12-07:00
                      email: test@example.com
                      expiration: null
                      firstLogin: false
                      homeDir: /
                      modified: 2020-07-24T07:51:13-07:00
                      nickname: exavaultnickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: master
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124419
                    relationships:
                      homeResource:
                        data:
                          id: 2536831
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                  - attributes:
                      accountName: exampleaccount
                      accountOnboarding: true
                      allowedIp: null
                      branding: true
                      clientId: 1
                      complexPasswords: false
                      created: 2019-05-30T20:48:57Z
                      customDomain: false
                      customSignature: null
                      externalDomains: null
                      maxUsers: 5
                      modified: 2019-08-27T01:03:41Z
                      quota:
                        diskLimit: 37580963840
                        diskUsed: 24938382543
                        noticeEnabled: true
                        noticeThreshold: 90
                      secureOnly: false
                      showReferralLinks: true
                      status: 1
                      userCount: 4
                      welcomeEmailContent: |
                        "Great news, your new account is ready!\n\nFor your records, we've listed information you'll use to log in below:\n\nFTP Server: [[ftpserver]]\n\nUsername (Web and FTP access): [[username]]\n\n[[setpassword]]"
                      welcomeEmailSubject: ExaVault File Sharing Account
                    id: 7
                    relationships:
                      masterUser:
                        data:
                          id: 1
                          type: user
                    type: account
                  - attributes:
                      accessedAt: 2011-03-21T00:18:56-07:00
                      createdAt: 2011-03-21T00:18:56-07:00
                      createdBy: exampleuser
                      extension: dir
                      fileCount: 3
                      hash: ec4aa9a91be282666a165899a14f29b1
                      name: examplefolder
                      path: /examplefolder
                      previewable: false
                      size: 12321321
                      updatedAt: 2011-03-21T00:18:56-07:00
                      uploadDate: 2011-03-21T00:18:56-07:00
                    id: 2
                    relationships:
                      directFile:
                        data:
                          id: 101
                          type: directFile
                      notifications:
                        - data:
                            id: 1117
                            type: notification
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 103
                          type: resource
                      share:
                        data:
                          id: 1499
                          type: share
                    type: resource
                responseStatus: 200
                returnedResults: 2
                totalResults: 50
              schema:
                $ref: "#/components/schemas/ResourceCollectionResponse"
          description: Successful Operation
      summary: Get a list of all resources
      tags:
        - Resources
  "/resources/list/{id}":
    get:
      description: |
        Returns a list of files/folders for the parent resource ID.

        You can use this API call to get information about all files and folders at a specified path. By default, the API returns basic metadata on each file/folder. An optional \`include\` parameter forces the return of additional metadata. As with all API calls, the path should be the full path relative to the user's home directory (e.g. **/myfiles/some_folder**).

        **Notes:**
        - Authenticated user should have list permission.
      operationId: listResourceContents
      parameters:
        - description: "API Key required to make the API call. "
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: ID of the parent resource to get a list of resources for.
          in: path
          name: id
          required: true
          schema:
            format: int64
            type: integer
        - description: Endpoint support multiple sort fields by allowing array of sort params. Sort fields should be applied in the order specified. The sort order for each sort field is ascending unless it is prefixed with a minus (“-“), in which case it will be descending.
          in: query
          name: sort
          schema:
            example: name
            type: string
        - description: Determines which item to start on for pagination. Use zero (0) to start at the beginning of the list.
          in: query
          name: offset
          required: false
          schema:
            default: 0
            format: int32
            type: integer
        - description: The number of files to limit the result. Cannot be set higher than 100. If you have more than one hundred files in your directory, make multiple calls, incrementing the \`offset parameter, above.
          in: query
          name: limit
          required: false
          schema:
            format: int32
            type: integer
        - description: Limit types of resources returned to "file" or "dir" only.
          in: query
          name: type
          required: false
          schema:
            type: string
        - description: Comma separated list of relationships to include in response. Possible values are **share**, **notifications**, **directFile**, **parentResource**, **ownerUser**, **ownerUser**.
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      accessedAt: 2011-03-21T00:18:56-07:00
                      createdAt: 2011-03-21T00:18:56-07:00
                      createdBy: exampleuser
                      extension: dir
                      fileCount: 3
                      hash: ec4aa9a91be282666a165899a14f29b1
                      name: examplefolder
                      path: /examplefolder
                      previewable: false
                      size: 12321321
                      updatedAt: 2011-03-21T00:18:56-07:00
                      uploadDate: 2011-03-21T00:18:56-07:00
                    id: 2
                    relationships:
                      directFile:
                        data:
                          id: 101
                          type: directFile
                      notifications:
                        - data:
                            id: 1117
                            type: notification
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 103
                          type: resource
                      share:
                        data:
                          id: 1499
                          type: share
                    type: resource
                included:
                  - attributes:
                      accessDescription: Download only
                      accessMode:
                        delete: false
                        download: true
                        modify: false
                        upload: false
                      assets:
                        - Test
                      created: 2020-07-29T08:51:39-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: null
                      hasNotification: false
                      hasPassword: false
                      hash: 17t-eojdhh1j
                      inherited: null
                      messages: []
                      modified: 2020-07-29T09:53:36-07:00
                      name: Test
                      ownerHash: 17t-eojowf1j-sfh242uj
                      paths:
                        - /Test
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: shared_folder
                    id: 1499
                    type: share
                  - attributes:
                      accountId: 7
                      blockUntil: -001-11-29T16:07:02-07:52
                      created: 2020-07-29T09:53:12-07:00
                      isEnabled: true
                      isIndexEnabled: true
                      modified: 2020-07-29T09:53:12-07:00
                      path: /Test
                    id: 101
                    type: directFile
                  - attributes:
                      action: upload
                      created: 2020-07-29T20:15:09-07:00
                      message: null
                      modified: 2020-07-29T20:15:09-07:00
                      name: /Test
                      path: /Test
                      readableDescription: anybody uploads to '/Test'
                      readableDescriptionWithoutPath: anybody uploads to this folder
                      recipientEmails:
                        - exavault@example.com
                        - exavault+1@example.com
                      recipients:
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault@example.com
                          id: 81
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault+1@example.com
                          id: 83
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                      sendEmail: false
                      type: folder
                      usernames:
                        - exavaultuser
                    id: 1143
                    relationships:
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      resource:
                        data:
                          id: 2554051
                          type: resource
                    type: notification
                  - attributes:
                      accessTimestamp: 2020-07-27 19:32:45
                      accountName: exavault
                      created: 2020-07-24T07:51:12-07:00
                      email: test@example.com
                      expiration: null
                      firstLogin: false
                      homeDir: /
                      modified: 2020-07-24T07:51:13-07:00
                      nickname: exavaultnickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: master
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124419
                    relationships:
                      homeResource:
                        data:
                          id: 2536831
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                  - attributes:
                      accountName: exampleaccount
                      accountOnboarding: true
                      allowedIp: null
                      branding: true
                      clientId: 1
                      complexPasswords: false
                      created: 2019-05-30T20:48:57Z
                      customDomain: false
                      customSignature: null
                      externalDomains: null
                      maxUsers: 5
                      modified: 2019-08-27T01:03:41Z
                      quota:
                        diskLimit: 37580963840
                        diskUsed: 24938382543
                        noticeEnabled: true
                        noticeThreshold: 90
                      secureOnly: false
                      showReferralLinks: true
                      status: 1
                      userCount: 4
                      welcomeEmailContent: |
                        "Great news, your new account is ready!\n\nFor your records, we've listed information you'll use to log in below:\n\nFTP Server: [[ftpserver]]\n\nUsername (Web and FTP access): [[username]]\n\n[[setpassword]]"
                      welcomeEmailSubject: ExaVault File Sharing Account
                    id: 7
                    relationships:
                      masterUser:
                        data:
                          id: 1
                          type: user
                    type: account
                  - attributes:
                      accessedAt: 2011-03-21T00:18:56-07:00
                      createdAt: 2011-03-21T00:18:56-07:00
                      createdBy: exampleuser
                      extension: dir
                      fileCount: 3
                      hash: ec4aa9a91be282666a165899a14f29b1
                      name: examplefolder
                      path: /examplefolder
                      previewable: false
                      size: 12321321
                      updatedAt: 2011-03-21T00:18:56-07:00
                      uploadDate: 2011-03-21T00:18:56-07:00
                    id: 2
                    relationships:
                      directFile:
                        data:
                          id: 101
                          type: directFile
                      notifications:
                        - data:
                            id: 1117
                            type: notification
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 103
                          type: resource
                      share:
                        data:
                          id: 1499
                          type: share
                    type: resource
                responseStatus: 200
                returnedResults: 2
                totalResults: 50
              schema:
                $ref: "#/components/schemas/ResourceCollectionResponse"
          description: Successful Operation
      summary: List contents of folder
      tags:
        - Resources
  /resources/move:
    post:
      description: |
        Moves a set of exisiting files/folders (provided by an array \`resources\`) to the requested \`parentResource\` in your account.
        In the \`resources\` array, you may specify paths pointing files/folders throughout the account, but everything will be moved to the root of the \`parentResource\`.

        **Notes:**
        - Authenticated user should have modify permission.
      operationId: moveResources
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              Example:
                value:
                  parentResource: /copyhere
                  resources:
                    - /testone.jpg
                    - /folder
            schema:
              properties:
                parentResource:
                  description: Resource identifier of folder to move files/folders to.
                  example: /copyhere
                  type: string
                resources:
                  description: Array containing file/folder paths to move.
                  example:
                    - /testone.jpg
                    - /folder
                  items:
                    type: string
                  type: array
              required:
                - resources
                - parentResource
              title: MoveResourcesRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              examples:
                $:
                  x-data:
                    attributes:
                      accessedAt: 2020-07-29T12:53:26-07:00
                      createdAt: 2020-07-29T12:53:26-07:00
                      createdBy: exavault
                      extension: jpg
                      fileCount: null
                      hash: f573b417707095b017a26d4e5a2e6dd0
                      name: test.jpg
                      path: /HomeTest/test.jpg
                      previewable: false
                      size: 33415
                      type: file
                      updatedAt: 2020-07-29T12:53:26-07:00
                      uploadDate: 2020-07-29T12:53:26-07:00
                    id: 2563533
                    type: resource
                  x-meta:
                    destinationPath: /HomeTest
                    path: /Test/test.jpg
                  x-responseStatus: 200
                Example:
                  value:
                    data:
                      attributes:
                        accessedAt: 2011-03-21T00:18:56-07:00
                        accessedTime: 0
                        createdAt: 2011-03-21T00:18:56-07:00
                        createdBy: exampleuser
                        createdTime: 0
                        extension: string
                        fileCount: 0
                        hash: ec4aa9a91be282666a165899a14f29b1
                        name: examplefolder
                        path: /examplefolder
                        previewable: true
                        size: 0
                        type: file
                        updatedAt: 2011-03-21T00:18:56-07:00
                        updatedTime: 0
                        uploadDate: 2011-03-21T00:18:56-07:00
                      id: 1
                      relationships:
                        directFile:
                          data:
                            id: 2
                            type: directFile
                        notifications:
                          - data:
                              id: 2
                              type: notification
                        parentResource:
                          data:
                            id: 2
                            type: resource
                        share:
                          data:
                            id: 2345
                            type: share
                      type: resource
                    meta:
                      id: 2321
              schema:
                $ref: "#/components/schemas/ResourceCopyMove"
          description: Successful Operation
        "207":
          content:
            application/json:
              example:
                responses:
                  - data:
                      attributes:
                        accessedAt: 2020-07-29T12:53:26-07:00
                        createdAt: 2020-07-29T12:53:26-07:00
                        createdBy: exavault
                        extension: jpg
                        fileCount: null
                        hash: f573b417707095b017a26d4e5a2e6dd0
                        name: test.jpg
                        path: /HomeTest/test.jpg
                        previewable: false
                        size: 33415
                        type: file
                        updatedAt: 2020-07-29T12:53:26-07:00
                        uploadDate: 2020-07-29T12:53:26-07:00
                      id: 2563533
                      type: resource
                    meta:
                      destinationPath: /HomeTest
                      path: /Test/test.jpg
                    responseStatus: 200
                  - errors:
                      - code: null
                        detail: null
                        meta:
                          destinationPath: /HomeTest
                          path: /Test/test2.jpg
                        title: null
                    responseStatus: 404
              schema:
                $ref: "#/components/schemas/ResourceMultiResponse"
          description: Multi Response
      summary: Move resources
      tags:
        - Resources
  /resources/preview:
    get:
      description: |
        Returns a resized image of the specified document for supported file types.

        Image data returned is encoded in base64 format and can be viewed using the \`<img>\` element.

        \`\`\`<img src='data:image/jpeg;base64' + meta.image/>\`\`\`

        **Notes:**
        - Supported files types are \`'jpg'\`, \`'jpeg'\`, \`'gif'\`, \`'png'\`, \`'bmp'\`, \`'pdf'\`, \`'psd'\`, \`'doc'\`
      operationId: getPreviewImage
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: Resource identifier for the image file.
          in: query
          name: resource
          required: true
          schema:
            type: string
        - description: The size of the image.
          in: query
          name: size
          required: true
          schema:
            enum:
              - small
              - medium
              - large
            type: string
        - description: Overrides sizes. Sets to a specific width.
          in: query
          name: width
          required: false
          schema:
            format: int32
            type: integer
        - description: Overrides sizes. Sets to a specific height.
          in: query
          name: height
          required: false
          schema:
            format: int32
            type: integer
        - description: Page number to extract from a multi-page document (0 is the first page). Vaild for **.pdf** or **.doc** files.
          in: query
          name: page
          required: false
          schema:
            default: 0
            format: int32
            type: integer
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  id: 2554101
                  type: resource
                meta:
                  image: exampleimagebinary
                  imageHash: 007e01062d91f9787f87c0cf78472d61
                  size: 13941
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/PreviewFileResponse"
          description: Successful Operation
      summary: Preview a file
      tags:
        - Resources
  /resources/upload:
    post:
      description: |
        Uploads a file to a specified path, with optional support for resuming a partially uploaded existing file.
      operationId: uploadFile
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Allows a file upload to resume at a certain number of bytes.
          example: 4852
          in: header
          name: offsetBytes
          required: false
          schema:
            type: integer
        - description: Destination path for the file being uploaded, including the file name.
          in: query
          name: path
          required: true
          schema:
            type: string
        - description: File size, in bits, of the file being uploaded.
          example: 2935
          in: query
          name: fileSize
          required: true
          schema:
            type: integer
        - description: |
            True if upload resume is supported, false if it isn't.
          example: true
          in: query
          name: resume
          schema:
            default: "true"
            type: boolean
        - description: "True if a file with the same name is found in the designated path, should be overwritten. False if different file names should be generated. "
          example: true
          in: query
          name: allowOverwrite
          schema:
            default: "false"
            type: boolean
      requestBody:
        content:
          multipart/form-data:
            schema:
              properties:
                file:
                  format: binary
                  type: string
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessedAt: 2020-07-29T12:50:38-07:00
                    accessedTime: 1596052238
                    createdAt: 2020-07-29T09:52:47-07:00
                    createdBy: exavaultuser
                    createdTime: 1596041567
                    extension: jpg
                    fileCount: null
                    hash: f836b417707583b017a26d4e5a2e6dd0
                    name: test.jpg
                    path: /exavault/test.jpg
                    previewable: false
                    size: 33415
                    type: file
                    updatedAt: 2020-07-29T19:27:31-07:00
                    updatedTime: 1596076051
                    uploadDate: 2020-07-29T09:52:47-07:00
                  id: 2559471
                  relationships:
                    ownerAccount:
                      data:
                        id: 7
                        type: account
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    parentResource:
                      data:
                        id: 2554051
                        type: resource
                  type: resource
                included: []
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/ResourceResponse"
          description: Successful Operation
      summary: Upload a file
      tags:
        - Resources
  "/resources/{id}":
    delete:
      description: |
        Delete a single file or folder resource. Deleting a folder will also delete all of the contents.

        **Notes:**
        - Authenticated user should have [delete permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions).
        - There is no way to un-delete a deleted resource.
      operationId: deleteResourceById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful Operation
      summary: Delete a Resource
      tags:
        - Resources
    get:
      description: |
        Returns metadata for specified file/folder path, including upload date, size and type. For the full list of returned properties, see the response syntax, below.

        **Notes:**
        - Authenticated user should have list permission.
      operationId: getResourceInfoById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Comma separated list of relationships to include in response. Possible values are **share**, **notifications**, **directFile**, **parentResource**, **ownerUser**, **ownerAccount**.
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessedAt: 2020-07-29T09:53:36-07:00
                    createdAt: 2020-07-28T15:59:23-07:00
                    createdBy: exavaultuser
                    extension: ""
                    fileCount: 2
                    hash: 7a2abd9f90ce196hf3f650c612372c0b
                    name: Test
                    path: /Test
                    previewable: false
                    size: 33415
                    type: dir
                    updatedAt: 2020-07-29T09:52:47-07:00
                    uploadDate: 2020-07-28T15:59:23-07:00
                  id: 2554051
                  relationships:
                    directFile:
                      data:
                        id: 101
                        type: directFile
                    notifications:
                      - data:
                          id: 1117
                          type: notification
                    ownerAccount:
                      data:
                        id: 7
                        type: account
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    parentResource:
                      data:
                        id: 103
                        type: resource
                    share:
                      data:
                        id: 1499
                        type: share
                  type: resource
                included:
                  - attributes:
                      accessDescription: Download only
                      accessMode:
                        delete: false
                        download: true
                        modify: false
                        upload: false
                      assets:
                        - Test
                      created: 2020-07-29T08:51:39-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: null
                      hasNotification: false
                      hasPassword: false
                      hash: 17t-eojdhh1j
                      inherited: null
                      messages: []
                      modified: 2020-07-29T09:53:36-07:00
                      name: Test
                      ownerHash: 17t-eojowf1j-sfh242uj
                      paths:
                        - /Test
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: shared_folder
                    id: 1499
                    type: share
                  - attributes:
                      accountId: 7
                      blockUntil: -001-11-29T16:07:02-07:52
                      created: 2020-07-29T09:53:12-07:00
                      isEnabled: true
                      isIndexEnabled: true
                      modified: 2020-07-29T09:53:12-07:00
                      path: /Test
                    id: 101
                    type: directFile
                  - attributes:
                      action: upload
                      created: 2020-07-29T20:15:09-07:00
                      message: null
                      modified: 2020-07-29T20:15:09-07:00
                      name: /Test
                      path: /Test
                      readableDescription: anybody uploads to '/Test'
                      readableDescriptionWithoutPath: anybody uploads to this folder
                      recipientEmails:
                        - exavault@example.com
                        - exavault+1@example.com
                      recipients:
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault@example.com
                          id: 81
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                        - created: 2020-07-29T20:15:09-07:00
                          email: exavault+1@example.com
                          id: 83
                          modified: 2020-07-29T20:15:09-07:00
                          notificationId: 1143
                      sendEmail: false
                      type: folder
                      usernames:
                        - exavaultuser
                    id: 1143
                    relationships:
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      resource:
                        data:
                          id: 2554051
                          type: resource
                    type: notification
                  - attributes:
                      accessTimestamp: 2020-07-27 19:32:45
                      accountName: exavault
                      created: 2020-07-24T07:51:12-07:00
                      email: test@example.com
                      expiration: null
                      firstLogin: false
                      homeDir: /
                      modified: 2020-07-24T07:51:13-07:00
                      nickname: exavaultnickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: master
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124419
                    relationships:
                      homeResource:
                        data:
                          id: 2536831
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                  - attributes:
                      accountName: exampleaccount
                      accountOnboarding: true
                      allowedIp: null
                      branding: true
                      clientId: 1
                      complexPasswords: false
                      created: 2019-05-30T20:48:57Z
                      customDomain: false
                      customSignature: null
                      externalDomains: null
                      maxUsers: 5
                      modified: 2019-08-27T01:03:41Z
                      quota:
                        diskLimit: 37580963840
                        diskUsed: 24938382543
                        noticeEnabled: true
                        noticeThreshold: 90
                      secureOnly: false
                      showReferralLinks: true
                      status: 1
                      userCount: 4
                      welcomeEmailContent: |
                        "Great news, your new account is ready!\n\nFor your records, we've listed information you'll use to log in below:\n\nFTP Server: [[ftpserver]]\n\nUsername (Web and FTP access): [[username]]\n\n[[setpassword]]"
                      welcomeEmailSubject: ExaVault File Sharing Account
                    id: 7
                    relationships:
                      masterUser:
                        data:
                          id: 1
                          type: user
                    type: account
                  - attributes:
                      accessedAt: 2011-03-21T00:18:56-07:00
                      createdAt: 2011-03-21T00:18:56-07:00
                      createdBy: exampleuser
                      extension: dir
                      fileCount: 3
                      hash: ec4aa9a91be282666a165899a14f29b1
                      name: examplefolder
                      path: /examplefolder
                      previewable: false
                      size: 12321321
                      updatedAt: 2011-03-21T00:18:56-07:00
                      uploadDate: 2011-03-21T00:18:56-07:00
                    id: 2
                    relationships:
                      directFile:
                        data:
                          id: 101
                          type: directFile
                      notifications:
                        - data:
                            id: 1117
                            type: notification
                      ownerAccount:
                        data:
                          id: 7
                          type: account
                      ownerUser:
                        data:
                          id: 124437
                          type: user
                      parentResource:
                        data:
                          id: 103
                          type: resource
                      share:
                        data:
                          id: 1499
                          type: share
                    type: resource
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ResourceResponse"
          description: Successful Operation
      summary: Get resource metadata
      tags:
        - Resources
    parameters:
      - description: ID number of the resource
        in: path
        name: id
        required: true
        schema:
          format: int64
          type: integer
    patch:
      description: |
        Update the specified file or folder resource record's "name" parameter. The resource is identified by the numeric resource ID that is passed in as the last segment of the URI.
      operationId: updateResourceById
      parameters:
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: API key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              example-1:
                value:
                  name: my-renamed-file.txt
            schema:
              properties:
                name:
                  description: The new name for the resource (file or folder).
                  example: my-renamed-file.txt
                  type: string
              title: UpdateResourceByIdRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessedAt: 2020-07-29T09:53:36-07:00
                    createdAt: 2020-07-28T15:59:23-07:00
                    createdBy: exavaultuser
                    extension: ""
                    fileCount: 2
                    hash: 7a2hhf9f90ce196de3f650c612372c0b
                    name: Test Folder
                    path: /Test Folder
                    previewable: false
                    size: 33415
                    type: dir
                    updatedAt: 2020-07-29T10:27:08-07:00
                    uploadDate: 2020-07-28T15:59:23-07:00
                  id: 2554051
                  relationships:
                    directFile:
                      data:
                        id: 101
                        type: directFile
                    notifications:
                      - data:
                          id: 1117
                          type: notification
                    ownerAccount:
                      data:
                        id: 7
                        type: account
                    ownerUser:
                      data:
                        id: 124437
                        type: user
                    parentResource:
                      data:
                        id: 103
                        type: resource
                    share:
                      data:
                        id: 1499
                        type: share
                  type: resource
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ResourceResponse"
          description: Successful operation
      summary: Rename a resource.
      tags:
        - Resources
  /shares:
    get:
      description: |-
        Get a list of shares that you would have access to view through the web interface. You can limit which results are returned by specifying specific types of shares you wish to view, finding things shared with a specific email address, as well as finding shares for specific folder names.

        **Notes:**

        - Authenticated user requires [share permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions).
        - To get share objects with type send, authenticated user's role must be admin or master.
      operationId: listShares
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: Current offset of records (for pagination)
          example: 100
          in: query
          name: offset
          schema:
            type: integer
        - description: Limit of records to be returned (for pagination)
          example: 10
          in: query
          name: limit
          schema:
            default: 100
            type: integer
        - description: Set of shares to return. (**all**=all of them, **active**=shares that are currently active, **curentUser**=shares created by you)
          example: active
          in: query
          name: scope
          schema:
            enum:
              - all
              - active
              - currentUser
            type: string
        - description: What order the list of matches should be in.
          example: created
          in: query
          name: sort
          schema:
            enum:
              - created
              - -created
            type: string
        - description: Limit the list of matches to only certain types of shares.
          example: receive
          in: query
          name: type
          schema:
            enum:
              - receive
              - shared_folder
              - send
            type: string
        - description: Comma separated list of relationships to include in response. Possible values are **owner**, **resources**, **notifications**, **activity**.
          example: owner,notifications
          in: query
          name: include
          schema:
            type: string
        - description: |-
            When provided, only shares whose names include this value will be in the list. Supports wildcards, such as **send\*** to return everything starting with "send".

            Use this parameter if you are searching for shares or receives for a specific folder name. For example **/Clients/ACME/To Be Processed**.
          in: query
          name: name
          schema:
            example: Customer*
            type: string
        - description: 'Filter the results to include only shares that invited a certain email address. Supports wildcard matching so that **\*@example.com** will give back entries shared with addresses ending in "@example.com". '
          in: query
          name: recipient
          schema:
            example: test@example.com
            type: string
        - description: When provided, only shares with a message that contains the text will be included in the list of matches. Both the subject and the body of all messages will be checked for matches. This will always be a wildcard match, so that searching for **taxes** will return any shares with a message that contains the word "taxes".
          in: query
          name: message
          schema:
            example: submitted
            type: string
        - description: When provided, only shares created by the user with that \`username\` will be included in the list. Does not support wildcard searching.
          in: query
          name: username
          schema:
            example: example
            type: string
        - description: Searches the share name, username, recipients, share messages fields for the provided value. Supports wildcard searches.
          in: query
          name: search
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      accessDescription: Receive folder
                      accessMode:
                        delete: false
                        download: false
                        modify: false
                        upload: true
                      assets:
                        - Receive test
                      created: 2020-07-27T23:34:49-07:00
                      embed: true
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: 413
                      hasNotification: true
                      hasPassword: false
                      hash: 153-3n9ycimh
                      inherited: null
                      messages: []
                      modified: 2020-07-28T09:33:11-07:00
                      name: Receive test
                      ownerHash: 153-3n9ycimh-99dm0ome
                      paths:
                        - /YK tests1/Receive test
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: receive
                    id: 1403
                    relationships:
                      activity:
                        - data:
                            id: 1719
                            type: shareActivity
                      notifications:
                        - data:
                            id: 1045
                            type: notification
                      owner:
                        data:
                          id: 7
                          type: user
                      resources:
                        - data:
                            id: 2497089
                            type: resource
                    type: share
                  - attributes:
                      accessDescription: Download only
                      accessMode:
                        delete: false
                        download: true
                        modify: false
                        upload: false
                      assets:
                        - Logos
                      created: 2020-07-27T20:57:33-07:00
                      embed: false
                      expiration: null
                      expired: false
                      fileDropCreateFolders: false
                      formId: null
                      hasNotification: null
                      hasPassword: false
                      hash: 14y-69359sgr
                      inherited: null
                      messages: []
                      modified: 2020-07-28T09:33:11-07:00
                      name: Logos
                      ownerHash: 14y-69359sgr-7tsf6cxx
                      paths:
                        - /STest071520/Logos
                      public: true
                      recipients: []
                      requireEmail: false
                      resent: null
                      status: 1
                      trackingStatus: null
                      type: shared_folder
                    id: 1399
                    relationships:
                      owner:
                        data:
                          id: 7
                          type: user
                      resources:
                        - data:
                            id: 2547033
                            type: null
                    type: share
                included: []
                responseStatus: 200
                returnedResults: 27
                totalResults: 98
              schema:
                $ref: "#/components/schemas/ShareCollectionResponse"
          description: Successful operation
      summary: Get a list of shares
      tags:
        - Shares
    post:
      description: |-
        Creates a new share object for the given path in your account. We support three types of shares:

          - A **shared folder** allows you to let outside parties access a folder in your account (including any files and nested subfolders) using just a link. Shared folders can be restricted; e.g. with an expiration date, password, download-only, etc. Shared folders are 'live'; if someone makes a change to a file in your shared folder, it will be immediately reflected in your account, and vice-versa.
          - A file **send** lets you send one or more files via an easy download link. File sends are different than shared folders because file sends are 'point in time' -- the recipient will get the files as you sent them. If you later make a change to the source file, it will not be updated for the recipient.
          - A **receive** folder lets you receive files into your account. You can either send users a link, or optionally [embed a customized form](/docs/account/05-file-sharing/05-upload-widget) on your website.

        **How to send files from your computer using the API**:

        In order to use the API to send files which are not already stored in your account, you'll need to follow a three-step process:

        1. Use the [POST /shares](#operation/addShare) endpoint to set up your send, including password, recipients, expiration, etc. You must include **upload** among the permissions in the \`accessMode\` and set the \`sendingLocalFiles\` parameter to **true**. The response that is returned will include a "meta" attribute, which contains an **accessToken** attribute. This new access token is valid only for the send.
        2. Use the [POST /resources/upload](#operation/uploadFile) endpoint to upload your files to the send you've created. The "/" path represents the root of the share, not your home directory. **You must send the access token that you received from the first step in the \`ev-access-token\` header**
        3. Use the [POST /shares/complete-send/{id}](#operation/completeDirectSend) endpoint to indicate that you have finished uploading files to your send. This will trigger the system to remove the **upload** permission from the share and send any invitation emails you set up in the first step of the process. **You must send YOUR access token in the \`ev-access-token\` header, not the temporary access token**

        **Setting the Share Permissions**

        Only 5 different combinations of permissions are valid for the \`accessMode\` object:

        - **Upload Only**: This allows share visitors to upload to a share but do nothing else to the contained files. To use this mode, set \`upload\` to **true** and all other permissions to **false**
        - **Download Only**: This allows share visitors to download files from a share but do nothing else to the contained files. To use this mode, set \`download\` to **true** and all other permissions to **false**
        - **Upload and Download**: This allows share visitors to upload new files to the share or download files within the share, but not make any other changes to the share contents. To use this mode, set \`upload\` and \`download\` to **true** and set both \`modify\` and \`delete\` to **false**
        - **All but Delete**: This allows share visitors to make any changes to the contents of a share except deleting files. To use this mode, set \`upload\`, \`download\`, and \`modify\` to **true** and set \`delete\` to **false**
        - **Full Access**: This allows share visitors to make any changes to the contents of a share. To use this mode, set all 4 permissions \`upload\`, \`download\`, \`modify\`, and \`delete\` to **true**

        Any other combination of permissions provided as the \`accessMode\` will be rejected as a bad request.

        **Notes:**

        Authenticated user requires [share permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions).
      operationId: addShare
      parameters:
        - description: API Key required to make the API call.
          example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              example-1:
                value:
                  accessMode:
                    delete: true
                    download: true
                    modify: true
                    upload: true
                  embed: false
                  expiration: 2017-09-25T14:12:10Z
                  fileDropCreateFolders: false
                  hasNotification: false
                  isPublic: true
                  messageBody: null
                  messageSubject: Invitation to a shared folder
                  name: Shared Folder
                  notificationEmails:
                    - notify@example.com
                    - notify2@example.com
                  password: null
                  recipients:
                    - email: user@example.com
                      type: string
                  requireEmail: false
                  resources:
                    - /testfolder
                  sendingLocalFiles: true
                  type: shared_folder
            schema:
              properties:
                accessMode:
                  $ref: "#/components/schemas/AccessMode"
                embed:
                  description: Whether this share can be embedded within a web page.
                  example: false
                  type: boolean
                expiration:
                  description: Expiration date for the share. If someone attempts to use the share after this date, they will receive an error that the share is not available.
                  example: 2017-09-25T14:12:10Z
                  format: date-time
                  type: string
                fileDropCreateFolders:
                  description: "Only used for **receive** shares. If true, uploads will be automatically placed into sub-folders of the folder, named after the chosen field on your form. "
                  example: false
                  type: boolean
                hasNotification:
                  description: Whether delivery receipts should be sent.
                  example: false
                  type: boolean
                isPublic:
                  description: Whether someone can visit the share without following a personalized recipient link.
                  example: true
                  type: boolean
                messageBody:
                  description: The message to be included in email invitations for your recipients. Ignored if you have not also provided \`recipients\` and \`messageSubject\`
                  example: null
                  type: string
                messageSubject:
                  description: Subject to use on emails inviting recipients to the share. Ignored if you have not also provided \`recipients\` and a \`messageBody\`
                  example: Invitation to a shared folder
                  type: string
                name:
                  description: "A name for the share. This will be visible on the page that recipients visit. "
                  example: Shared Folder
                  type: string
                notificationEmails:
                  description: Emails that will receive delivery receipts for this share. \`hasNotification\` must be **true** for delivery receipts will be sent.
                  example:
                    - notify@example.com
                    - notify2@example.com
                  items:
                    format: email
                    type: string
                  type: array
                password:
                  description: Set a password for recipients to access the share. All recipients will use the same password.
                  example: null
                  type: string
                recipients:
                  description: "People you want to invite to the share. **Note**: unless you also set the \`messageSubject\` and \`messageBody\` for the new share, invitation emails will not be sent to these recipients."
                  items:
                    properties:
                      email:
                        description: Email address of person you are inviting to the share
                        format: email
                        type: string
                      type:
                        description: What kind of email should be sent to this recipient. Valid choices are **direct** and **cc**
                        type: string
                    type: object
                  type: array
                requireEmail:
                  description: True if recipients must provide their email to view the share.
                  example: false
                  type: boolean
                resources:
                  description: |
                    Array of resources for this share. See details on [how to specify resources](#section/Identifying-Resources) above.

                    **shared_folder** and **receive** shares must have only one \`resource\`, which is a directory that does not have a current share attached.

                    **send** shares may have multiple \`resource\` parameters. You can also leave this parameter null if you are planning to upload files to the send. If you are planning to upload files to the send that are not yet in your account, you will also need to call the [POST /shares/complete-send/{id}](#operation/completeDirectSend) endpoint to finish the send operation.
                  example:
                    - /testfolder
                  items:
                    type: string
                  type: array
                sendingLocalFiles:
                  description: Use this only for **send** shares. Flag to indicate that you are going to upload additional files from your computer to the share. If this is **true**, you will also need to use the [POST /shares/complete-send/{id}](#operation/completeDirectSend) call to finish setting up your share after the files are uploaded.
                  type: boolean
                type:
                  description: The type of share to create. See above for a description of each.
                  enum:
                    - shared_folder
                    - receive
                    - send
                  example: shared_folder
                  type: string
              required:
                - type
                - name
              title: AddShareRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessDescription: Upload only
                    accessMode:
                      delete: false
                      download: false
                      modify: false
                      upload: true
                    created: 2017-04-21T10:53:47Z
                    embed: true
                    expiration: null
                    expired: false
                    fileDropCreateFolders: false
                    hasNotification: true
                    hasPassword: false
                    hash: wgf1-352
                    inherited: false
                    messages:
                      - body: You have files available for download.
                        created: 2017-04-21T10:53:47Z
                        id: 23
                        modified: 2017-04-21T10:53:47Z
                        subject: Message subject.
                    modified: 2017-04-21T10:53:47Z
                    name: Example Share
                    ownerHash: hd1e-3erufo72-fwggk999
                    paths:
                      - /example share
                    public: true
                    recipients:
                      - created: 2017-04-21T10:53:47Z
                        email: recipient@example.com
                        hash: fsesghan
                        id: 11
                        received: false
                        sent: true
                        type: direct
                    requireEmail: false
                    resent: null
                    status: 1
                    type: shared_folder
                  id: 10
                  relationships:
                    notifications:
                      - data:
                          id: 14
                          type: notification
                      - data:
                          id: 15
                          type: notification
                    owner:
                      data:
                        id: 12
                        type: user
                    resource:
                      - data: null
                        id: 13
                        type: resource
                  type: share
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ShareResponse"
          description: Successful operation
      summary: Creates a share
      tags:
        - Shares
  "/shares/complete-send/{id}":
    post:
      description: |
        After uploading the file(s) to be sent, this method will trigger invitation emails and finish the send files setup. If you are not sending files from your own computer in a send, you will not need this step.

        **How to send files from your computer using the API**:

        In order to use the API to send files which are not already stored in your account, you'll need to follow a three-step process:

        1. Use the [POST /shares](#operation/addShare) endpoint to set up your send, including password, recipients, expiration, etc. You must include **upload** among the permissions in the \`accessMode\` and set the \`sendingLocalFiles\` paramter to **true**. The response that is returned will include a "meta" attribute, which contains an **accessToken** attribute. This new access token is valid only for the send.
        2. Use the [POST /resources/upload](#operation/uploadFile) endpoint to upload your files to the send you've created. The "/" path represents the root of the share, not your home directory. **You must send the access token that you received from the first step in the \`ev-access-token\` header**
        3. Use the [POST /shares/complete-send/{id}](#operation/completeDirectSend) endpoint to indicate that you have finished uploading files to your send. This will trigger the system to remove the **upload** permission from the share and send any invitation emails you set up in the first step of the process. **You must send YOUR access token in the \`ev-access-token\` header, not the temporary access token**
      operationId: completeDirectSend
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: ID of the share to trigger invitations for.
          in: path
          name: id
          required: true
          schema:
            type: integer
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ShareResponse"
          description: Successful operation
      summary: Complete send files
      tags:
        - Shares
  "/shares/{id}":
    delete:
      description: |-
        Deactivate a share. Deactivating a share does not remove the underlying files for **shared_folder** and **receive** share types; it merely removes the access URL. Deleting a **send** share type does remove the associated files, as files that have been sent are only associated with the share, and aren't stored anywhere else in the account.

        **Notes:**

        - You must have [sharing permissons](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to use this.
        - You must have [admin-level access](/docs/account/04-users/01-admin-users), or you must be the owner of the specified share you wish to delete.
      operationId: deleteShareById
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful operation
      summary: Deactivate a share
      tags:
        - Shares
    get:
      description: |-
        Get the details for a specific share entry. You can use the \`include\` parameter to also get the details of related records, such as the owning user or the resources involved in the share.

        **Notes:**

        - Authenticated user requires [share permission](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions).
        - To get share objects with type send, authenticated user's role must be admin or master.
      operationId: getShareById
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: Comma separated list of relationships to include in response. Possible values are **owner**, **resources**, **notifications**, **activity**.
          example: owner,notifications
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessDescription: Upload only
                    accessMode:
                      delete: false
                      download: false
                      modify: false
                      upload: true
                    created: 2017-04-21T10:53:47Z
                    embed: true
                    expiration: null
                    expired: false
                    fileDropCreateFolders: false
                    hasNotification: true
                    hasPassword: false
                    hash: wef1-352
                    inherited: false
                    messages:
                      - body: You have files available for download.
                        created: 2017-04-21T10:53:47Z
                        id: 23
                        modified: 2017-04-21T10:53:47Z
                        subject: Message subject.
                    modified: 2017-04-21T10:53:47Z
                    name: Example Share
                    ownerHash: hd1e-3eerg72-fsxak999
                    paths:
                      - /example share
                    public: true
                    recipients:
                      - created: 2017-04-21T10:53:47Z
                        email: recipient@example.com
                        hash: fethwxan
                        id: 11
                        received: false
                        sent: true
                        type: direct
                    requireEmail: false
                    resent: null
                    status: 1
                    type: shared_folder
                  id: 10
                  relationships:
                    notifications:
                      - data:
                          id: 14
                          type: notification
                      - data:
                          id: 15
                          type: notification
                    owner:
                      data:
                        id: 12
                        type: user
                    resources:
                      - data:
                          id: 13
                          type: resource
                  type: share
                included:
                  - attributes:
                      accessTimestamp: 2019-09-06T11:40:29Z
                      created: 2019-05-29T20:48:57Z
                      email: user@example.com
                      expiration: 2020-04-21T10:53:47Z
                      firstLogin: false
                      homeDir: /
                      modified: 2019-07-27T01:03:41Z
                      nickname: examplenickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: master
                      status: 0
                      timeZone: UTC
                      username: exampleuser
                    id: 12
                    type: user
                  - attributes:
                      accessedAt: 2019-05-29T20:48:57Z
                      createdAt: 2019-05-29T20:48:57Z
                      extension: null
                      fileCount: 1
                      hash: ec4aa9a91er282666a165899a14f29b1
                      name: Shared Folder
                      path: /Shared Folder
                      previewable: false
                      size: 987
                      type: folder
                      updatedAt: 2019-05-29T20:48:57Z
                      uploadDate: 2019-05-29T20:48:57Z
                    id: 13
                    type: resource
                  - attributes:
                      action: upload
                      created: 2019-05-29T20:48:57Z
                      message: null
                      name: Shared Folder
                      path: /Shared Folder
                      readableDescription: null
                      readableDescriptionWithoutPath: null
                      recipientEmails:
                        - recipient@example.com
                      recipients:
                        - created: 2019-05-29T20:48:57Z
                          email: recipient@example.com
                          id: 18
                          modified: 2019-05-29T20:48:57Z
                          notificationId: 14
                      sendEmail: 1
                      type: shared_folder
                      updated: 2019-05-29T20:48:57Z
                      usernames:
                        - notice_user_all
                    id: 14
                    type: notification
                  - attributes:
                      action: upload
                      created: 2019-05-29T20:48:57Z
                      message: null
                      name: Shared Folder2
                      path: /Shared Folder2
                      readableDescription: null
                      readableDescriptionWithoutPath: null
                      recipientEmails:
                        - recipient@example.com
                      recipients:
                        - created: 2019-05-29T20:48:57Z
                          email: recipient@example.com
                          id: 18
                          modified: 2019-05-29T20:48:57Z
                          notificationId: 14
                      sendEmail: 1
                      type: shared_folder
                      updated: 2019-05-29T20:48:57Z
                      usernames:
                        - notice_user_all
                    id: 15
                    type: notification
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ShareResponse"
          description: Successful operation
      summary: Get a share
      tags:
        - Shares
    parameters:
      - description: ID of the share entry
        in: path
        name: id
        required: true
        schema:
          example: 23241
          format: int32
          type: integer
    patch:
      description: |-
        Change the settings on an active share. Any changes made will affect all users that have access to the share.

        When updating invitees, pass the \`recipients\` body paramater with the full list of people who should be included on the share. If you resend the list without an existing recipient, they will be removed from the share.

        **Setting the Share Permissions**

        Only 5 different combinations of permissions are valid for the \`accessMode\` object:

        - **Upload Only**: This allows share visitors to upload to a share but do nothing else to the contained files. To use this mode, set \`upload\` to **true** and all other permissions to **false**
        - **Download Only**: This allows share visitors to download files from a share but do nothing else to the contained files. To use this mode, set \`download\` to **true** and all other permissions to **false**
        - **Upload and Download**: This allows share visitors to upload new files to the share or download files within the share, but not make any other changes to the share contents. To use this mode, set \`upload\` and \`download\` to **true** and set both \`modify\` and \`delete\` to **false**
        - **All but Delete**: This allows share visitors to make any changes to the contents of a share except deleting files. To use this mode, set \`upload\`, \`download\`, and \`modify\` to **true** and set \`delete\` to **false**
        - **Full Access**: This allows share visitors to make any changes to the contents of a share. To use this mode, set all 4 permissions \`upload\`, \`download\`, \`modify\`, and \`delete\` to **true**

        Any other combination of permissions provided as the \`accessMode\` will be rejected as a bad request.

        **Notes:**

          - Authenticated user should be the owner of the specified share.
      operationId: updateShareById
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access Token
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
      requestBody:
        content:
          application/json:
            examples:
              example-1:
                value:
                  accessMode:
                    delete: true
                    download: true
                    modify: true
                    upload: true
                  embed: false
                  expiration: 2017-09-25T14:12:10Z
                  fileDropCreateFolders: false
                  hasNotification: false
                  isPublic: true
                  messageBody: null
                  messageSubject: Invitation to a shared folder
                  name: Shared Folder
                  notificationEmails:
                    - notify@example.com
                    - notify2@example.com
                  password: null
                  recipients:
                    - email: user@example.com
                      type: string
                  requireEmail: false
                  resources:
                    - /testfolder
                  status: 0
            schema:
              properties:
                accessMode:
                  $ref: "#/components/schemas/AccessMode"
                embed:
                  description: Whether the share can be embedded in another web page.
                  example: false
                  type: boolean
                expiration:
                  description: New expiration date and time for the share
                  example: 2017-09-25T14:12:10Z
                  format: date-time
                  type: string
                fileDropCreateFolders:
                  description: Whether uploads to a receive folder should be automatically placed into subfolders. See our [receive folder documentation](/docs/account/05-file-sharing/05-form-builder#advanced-form-settings)
                  example: false
                  type: boolean
                hasNotification:
                  description: Whether delivery receipts should be sent for this share.
                  example: false
                  type: boolean
                isPublic:
                  description: Whether people can visit the share without following a link from an invitation email
                  example: true
                  type: boolean
                messageBody:
                  description: Message content to use for emails inviting recipients to the share. Ignored if you have not also provided \`recipients\` and a \`subject\`
                  example: null
                  type: string
                messageSubject:
                  description: Subject to use on emails inviting recipients to the share. Ignored if you have not also provided \`recipients\` and a \`message\`
                  example: Invitation to a shared folder
                  type: string
                name:
                  description: Name of the share.
                  example: Shared Folder
                  type: string
                notificationEmails:
                  description: "List of email addresses to send delivery receipts to. Ignored if \`hasNotification\` is false. "
                  example:
                    - notify@example.com
                    - notify2@example.com
                  items:
                    format: email
                    type: string
                  type: array
                password:
                  description: New password for the share. To leave the password unchanged, do not send this parameter.
                  example: null
                  type: string
                recipients:
                  description: |-
                    People you want to invite to the share.

                    **Note**: unless you also set the \`subject\` and \`message\` for the new share, invitation emails will not be sent to these recipients.

                    **Note**: Recipients in this list will **REPLACE** the recipients already assigned to this share.
                  items:
                    properties:
                      email:
                        description: Email address of person you are inviting to the share
                        format: email
                        type: string
                      type:
                        description: What kind of email should be sent to this recipient. Valid choices are **direct** and **cc**
                        type: string
                    type: object
                  type: array
                requireEmail:
                  description: Whether visitors to the share will be required to enter their email in order to access the share.
                  example: false
                  type: boolean
                resources:
                  description: |-
                    Array of resources for this share. See details on [how to specify resources](#section/Identifying-Resources) above.

                    **shared_folder** and **receive** shares must have only one \`resource\`, which is a directory that does not have a current share attached.

                    **send** shares may have multiple \`resource\` parameters.

                    **NOTE**: Sending this parameter will **REPLACE** the existing resources with the resources included in this request.
                  example:
                    - /testfolder
                  items:
                    type: string
                  type: array
                status:
                  description: New status for the share. You can set an active share to inactive by setting the status to **0**
                  type: integer
              title: UpdateShareRequestBody
              type: object
        description: ""
        required: true
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessDescription: Upload only
                    accessMode:
                      delete: false
                      download: false
                      modify: false
                      upload: true
                    created: 2017-04-21T10:53:47Z
                    embed: true
                    expiration: null
                    expired: false
                    fileDropCreateFolders: false
                    hasNotification: true
                    hasPassword: false
                    hash: wgf1-352
                    inherited: false
                    messages:
                      - body: You have files available for download.
                        created: 2017-04-21T10:53:47Z
                        id: 23
                        modified: 2017-04-21T10:53:47Z
                        subject: Message subject.
                    modified: 2017-04-21T10:53:47Z
                    name: Example Share
                    ownerHash: hd1e-3erufo72-fwggk999
                    paths:
                      - /example share
                    public: true
                    recipients:
                      - created: 2017-04-21T10:53:47Z
                        email: recipient@example.com
                        hash: fsesghan
                        id: 11
                        received: false
                        sent: true
                        type: direct
                    requireEmail: false
                    resent: null
                    status: 1
                    type: shared_folder
                  id: 10
                  relationships:
                    notifications:
                      - data:
                          id: 14
                          type: notification
                      - data:
                          id: 15
                          type: notification
                    owner:
                      data:
                        id: 12
                        type: user
                    resources:
                      - data:
                          id: 13
                          type: resource
                  type: share
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/ShareResponse"
          description: Successful operation
      summary: Update a share
      tags:
        - Shares
  /ssh-keys:
    get:
      description: Returns a list of SSH Keys within the account. Can be filtered for a single user.
      operationId: getSSHKeysList
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
        - description: " Only return results for the given user ID. This is not the username, but the numeric ID of the user."
          in: query
          name: userId
          schema:
            type: string
        - description: " Limits the results by the given number. Cannot be set higher than 100."
          in: query
          name: limit
          schema:
            type: integer
        - description: " Determines which item to start on for pagination. Use zero (0) to start at the beginning of the list."
          in: query
          name: offset
          schema:
            type: integer
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SSHKeyCollectionResponse"
          description: Successful Operation
      summary: Get metadata for a list of SSH Keys
      tags:
        - SSH Keys
    post:
      description: |-
        Create a new SSH Key for a user. Provide the Public Key as formatted from the ssh-keygen command (openssh format or RFC-4716 format).

        If you'd prefer to let us generate your key automatically, you can log in to your account via the web portal and set up new keys via the SSH Keys page.
      operationId: addSSHKey
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      requestBody:
        content:
          application/json:
            schema:
              properties:
                publicKey:
                  description: "Public Key to provide ExaVault. You can provide the Public Key as formatted from the ssh-keygen command or a standard rfc-4716 format. "
                  type: string
                userId:
                  description: "ID of the user to assign the new key to. "
                  type: integer
              required:
                - userId
                - publicKey
              title: AddSSHKeyRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SSHKeyResponse"
          description: Successful Operation
      summary: Create a new SSH Key
      tags:
        - SSH Keys
  "/ssh-keys/{id}":
    delete:
      description: Delete the specified SSH key. This will not delete or deactivate the user tied to the key.
      operationId: deleteSSHKey
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      responses:
        "200":
          description: Successful Operation
      summary: Delete an SSH Key
      tags:
        - SSH Keys
    get:
      description: Return the information for a single SSH Key
      operationId: getSSHKey
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SSHKeyResponse"
          description: Successful Operation
      summary: Get metadata for an SSH Key
      tags:
        - SSH Keys
    parameters:
      - in: path
        name: id
        required: true
        schema:
          type: string
  /users:
    get:
      description: |-
        Get a list of the users in your account. There are three main types of searches you can do with this method:

        1. Search for a user by username. If you provide the \`username\` parameter in your call, then only the user who exactly matches that username will be in the list of matches. Any other parameters are ignored.
        1. Search for a user by individual filter fields (\`nickname\`,\`email\`,\`role\`,\`status\`,\`homeDir\`). Users in the list will be ones who match all of the filters you choose to search by. For example, you could look for users with the "admin" \`role\` AND \`email\` addresses ending in "*@acme.com".
        1. Search for a user by search string. If you provide the \`search\` parameter, users whose nickname OR email OR role OR homeDir match value your provide.

        **Notes:**

        - You must be an [admin-level user](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to use this.
        - The homeDir is the full path to the user's home directory, not a resource ID or hash.
      operationId: listUsers
      parameters:
        - description: API key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
        - description: The username of the user you are looking for. Only entries with the same username as this will be in the list of results. Does not support wildcard searches.
          example: testuser
          in: query
          name: username
          required: false
          schema:
            type: string
        - description: Resource identifier for user's home directory. Does not support wildcard searches.
          in: query
          name: homeResource
          schema:
            type: string
        - description: Nickname to search for. Ignored if \`username\` is provided. Supports wildcard searches.
          in: query
          name: nickname
          schema:
            type: string
        - description: Email to search for. Ignored if \`username\` is provided. Supports wildcard searches
          in: query
          name: email
          schema:
            example: "*@example.co"
            type: string
        - description: Types of users to include the list. Ignored if \`username\` is provided. Valid options are **admin**, **master** and **user**
          in: query
          name: role
          schema:
            example: use
            type: string
        - description: "Whether a user is locked. Ignored if \`username\` is provided. **0** means user is locked, **1** means user is not locked. "
          in: query
          name: status
          schema:
            type: integer
        - description: Searches the nickname, email, role and homeDir fields for the provided value. Ignored if \`username\` is provided. Supports wildcard searches.
          in: query
          name: search
          schema:
            type: string
        - description: Starting user record in the result set. Can be used for pagination.
          example: 50
          in: query
          name: offset
          required: false
          schema:
            format: int32
            type: integer
        - description: |-
            Sort order or matching users. You can sort by multiple columns by separating sort options with a comma; the sort will be applied in the order specified. The sort order for each sort field is ascending unless it is prefixed with a minus (“-“), in which case it will be descending.

            Valid sort fields are: **nickname**, **username**, **email**, **homeDir** and **modified**
          in: query
          name: sort
          required: false
          schema:
            example: homeDir,-modified
            type: string
        - description: Number of users to return. Can be used for pagination.
          example: 100
          in: query
          name: limit
          required: false
          schema:
            format: int32
            type: integer
        - description: Comma separated list of relationships to include in response. Valid options are **homeResource** and **ownerAccount**.
          example: homeResource,ownerAccount
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  - attributes:
                      accessTimestamp: 2020-07-24 23:37:39
                      accountName: exavault
                      created: 2020-07-24T08:03:57-07:00
                      email: test@example.com
                      expiration: null
                      firstLogin: false
                      homeDir: /
                      modified: 2020-07-24T15:53:02-07:00
                      nickname: exavaultnickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: admin
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124421
                    relationships:
                      homeResource:
                        data:
                          id: 2536831
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                  - attributes:
                      accessTimestamp: 0000-00-00 00:00:00
                      accountName: exavault
                      created: 2020-07-24T08:08:51-07:00
                      email: test@example.com
                      expiration: null
                      firstLogin: true
                      homeDir: /
                      modified: 2020-07-24T08:08:51-07:00
                      nickname: exavaultnickname
                      onboarding: true
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: true
                        download: true
                        list: true
                        modify: true
                        notification: true
                        share: true
                        upload: true
                        viewFormData: true
                      role: user
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124423
                    relationships:
                      homeResource:
                        data:
                          id: 2536831
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                  - attributes:
                      accessTimestamp: 0000-00-00 00:00:00
                      accountName: exavault
                      created: 2020-07-27T02:04:11-07:00
                      email: test+4@example.com
                      expiration: null
                      firstLogin: false
                      homeDir: /Sample Files and Folders
                      modified: 2020-07-27T02:04:11-07:00
                      nickname: exavaultnickname
                      onboarding: false
                      permissions:
                        changePassword: true
                        delete: true
                        deleteFormData: false
                        download: true
                        list: true
                        modify: true
                        notification: false
                        share: true
                        upload: true
                        viewFormData: false
                      role: user
                      status: 1
                      timeZone: America/Los_Angeles
                      username: exavaultuser
                    id: 124439
                    relationships:
                      homeResource:
                        data:
                          id: 2536835
                          type: resource
                      ownerAccount:
                        data:
                          id: 251
                          type: account
                    type: user
                included: []
                responseStatus: 200
                returnedResults: 3
                totalResults: 3
              schema:
                $ref: "#/components/schemas/UserCollectionResponse"
          description: Successful Operation
      summary: Get a list of users
      tags:
        - Users
    post:
      description: |-
        Adds a new user to the account. The user may be configured as an admin or standard user, and (if a standard user) may be assigned a restricted [home directory](/docs/account/04-users/00-introduction#setting-the-user-s-home-directory) and restricted [permissions](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions).

        **Notes:**

        - You must be an [admin-level user](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) to use this.
      operationId: addUser
      parameters:
        - description: API key required to make the API call
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            type: string
      requestBody:
        content:
          application/json:
            examples:
              example-1:
                value:
                  email: testuser@example.com
                  expiration: 2011-03-21 00:18:56
                  homeResource: /
                  locked: true
                  nickname: testnickname
                  onboarding: true
                  password: string
                  permissions:
                    changePassword: true
                    delete: true
                    deleteFormData: true
                    download: true
                    list: true
                    modify: true
                    notification: true
                    share: true
                    upload: true
                    viewFormData: true
                  role: user
                  timeZone: America/Los_Angeles
                  username: testuser
                  welcomeEmail: true
            schema:
              properties:
                email:
                  description: Email address for the user
                  example: testuser@example.com
                  format: email
                  type: string
                expiration:
                  description: Optional timestamp when the user should expire, formatted in date-time.
                  example: 2011-03-21 00:18:56
                  type: string
                homeResource:
                  description: |-
                    Resource identifier for the user's home folder. See details on [how to specify resources](#section/Identifying-Resources) above.

                    The user will be locked to this directory and unable to move 'up' in the account. If the folder does not exist in the account, it will be created when the user is created.

                    Users with the \`role\` **admin** should have their homeResource set to '/'
                  example: /
                  type: string
                locked:
                  description: If true, the user will not be able to log in
                  example: true
                  type: boolean
                nickname:
                  description: An optional nickname (e.g. 'David from Sales').
                  example: testnickname
                  type: string
                onboarding:
                  description: Set this to **true** to enable extra help popups in the web file manager for this user.
                  example: true
                  type: boolean
                password:
                  description: Password for the user
                  type: string
                permissions:
                  description: |-
                    An object containing name/value pairs for each permission. Any permission that is not passed will be set to \`false\` by default. Note that users will be unable to see any files in the account unless you include \`list\` permission.
                    When creating a user with the \`role\` **admin**, you should set all of the permissions to \`true\`
                  properties:
                    changePassword:
                      example: true
                      type: boolean
                    delete:
                      example: true
                      type: boolean
                    deleteFormData:
                      example: true
                      type: boolean
                    download:
                      example: true
                      type: boolean
                    list:
                      example: true
                      type: boolean
                    modify:
                      example: true
                      type: boolean
                    notification:
                      example: true
                      type: boolean
                    share:
                      example: true
                      type: boolean
                    upload:
                      example: true
                      type: boolean
                    viewFormData:
                      example: true
                      type: boolean
                  type: object
                role:
                  description: The type of user to create, either **user** or **admin**.
                  enum:
                    - user
                    - admin
                  example: user
                  type: string
                timeZone:
                  description: |
                    Time zone, used for accurate time display within the application. See <a href='https://php.net/manual/en/timezones.php' target='blank'>this page</a> for allowed values.
                  example: America/Los_Angeles
                  type: string
                username:
                  description: |-
                    Username of the user to create. This should follow standard username conventions - spaces are not allowed, etc. We do allow email addresses as usernames.

                    **Note** Usernames must be unique across all ExaVault accounts.
                  example: testuser
                  type: string
                welcomeEmail:
                  description: If **true**, send this new user a welcome email upon creation. The content of the welcome email can be configured with the [PATCH /accounts](#operation/updateAccount) method.
                  example: true
                  type: boolean
              required:
                - username
                - homeResource
                - email
                - password
                - role
                - permissions
                - timeZone
              title: AddUserRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessTimestamp: null
                    accountName: exavault
                    created: 2020-07-27T14:58:01-07:00
                    email: test@example.com
                    expiration: 2020-07-31T17:00:00-07:00
                    firstLogin: false
                    homePath: /
                    modified: 2020-07-27T14:58:01-07:00
                    nickname: exavaultnickname
                    onboarding: false
                    permissions:
                      changePassword: false
                      delete: false
                      deleteFormData: false
                      download: true
                      list: false
                      modify: false
                      notification: false
                      share: false
                      upload: true
                      viewFormData: false
                    role: user
                    status: 1
                    timeZone: America/Los_Angeles
                    username: exavaultuser
                  id: 124449
                  relationships:
                    homeResource:
                      data:
                        id: 2536831
                        type: resource
                    ownerAccount:
                      data:
                        id: 251
                        type: account
                  type: user
                included: []
                responseStatus: 201
              schema:
                $ref: "#/components/schemas/UserResponse"
          description: Successful Operation
      summary: Create a user
      tags:
        - Users
  "/users/{id}":
    delete:
      description: |
        Delete a user from the account. Deleting a user does **NOT** delete any files from the account; it merely removes a user's access. Aternatively, locking a user via the [PATCH /users/{id}](#operation/updateUser) will keep the user in your account, but make it unable to log in.

        Resources and shares owned by the deleted user will be owned by the master user after the deletion.

        **Notes:**

        - You must have [admin-level access](/docs/account/04-users/01-admin-users) to delete a user.
        - The primary owner of the account cannot be deleted.
      operationId: deleteUser
      parameters:
        - description: API Key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful Operation
      summary: Delete a user
      tags:
        - Users
    get:
      description: |-
        Get the details for a specific user. You can use the \`include\` parameter to also get the details of related records, such as the account or the home directory.

        **Notes:**

        - You must have [admin or master](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) access to use this.
      operationId: getUserById
      parameters:
        - description: API Key
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
        - description: Comma-separated list of relationships to include in response. Possible values include **homeResource** and **ownerAccount**.
          example: homeResource,owneraccount
          in: query
          name: include
          schema:
            example: homeResource,ownerAccount
            type: string
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessTimestamp: 2020-07-27 19:32:45
                    accountName: exavault
                    created: 2020-07-24T07:51:12-07:00
                    email: test@example.com
                    expiration: null
                    firstLogin: false
                    homeDir: /
                    modified: 2020-07-24T07:51:13-07:00
                    nickname: exavaultnickname
                    onboarding: true
                    permissions:
                      changePassword: true
                      delete: true
                      deleteFormData: true
                      download: true
                      list: true
                      modify: true
                      notification: true
                      share: true
                      upload: true
                      viewFormData: true
                    role: master
                    status: 1
                    timeZone: America/Los_Angeles
                    username: exavaultuser
                  id: 124419
                  relationships:
                    homeResource:
                      data:
                        id: 2536831
                        type: resource
                    ownerAccount:
                      data:
                        id: 251
                        type: account
                  type: user
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/UserResponse"
          description: Successful Operation
      summary: Get info for a user
      tags:
        - Users
    parameters:
      - description: The user's ID. Note that this is our internal ID, and _not the username_. You can obtain it by calling the [GET /users](#operation/listUsers) method.
        in: path
        name: id
        required: true
        schema:
          example: 2224
          format: int32
          type: integer
    patch:
      description: |-
        Updates the settings for the user. Note that the unique key for this API call is our internal ID, and _not_ the username, as the username can be changed.

        In the request body, you should only send the parameters for values that you wish to change for the user.

        **Notes:**

        - You must have [admin or master](/docs/account/04-users/00-introduction#managing-user-roles-and-permissions) access to edit other users. If you have user-level access, you can only update your own user settings.
        - You cannot edit a master user with this method.
      operationId: updateUser
      parameters:
        - description: API key required to make the API call.
          in: header
          name: ev-api-key
          required: true
          schema:
            example: exampleaccount-zwSuWUZ8S38h33qPS8v0s
            type: string
        - description: Access token required to make the API call.
          example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
          in: header
          name: ev-access-token
          required: true
          schema:
            example: 19853ef63a0bc348024a9e4cfd4a92520d2dfd04e88d8679fb1ed6bc551593d1
            type: string
      requestBody:
        content:
          application/json:
            examples:
              example-1:
                value:
                  email: testuser@example.com
                  expiration: 2011-03-21 00:18:56
                  homeResource: /
                  locked: true
                  nickname: testnickname
                  onboarding: true
                  password: string
                  permissions:
                    changePassword: true
                    delete: true
                    deleteFormData: true
                    download: true
                    list: true
                    modify: true
                    notification: true
                    share: true
                    upload: true
                    viewFormData: true
                  role: user
                  timeZone: America/Los_Angeles
                  username: testuser
            schema:
              properties:
                email:
                  description: Email address for the user
                  example: testuser@example.com
                  format: email
                  type: string
                expiration:
                  description: Optional timestamp when the user should expire.
                  example: 2011-03-21 00:18:56
                  type: string
                homeResource:
                  description: |-
                    Resource identifier for the user's home folder. See details on [how to specify resources](#section/Identifying-Resources) above.

                    The user will be locked to this directory and unable to move 'up' in the account. If the folder does not exist in the account, it will be created when the user logs in.

                    This setting is ignored for users with the \`role\` **admin**.
                  example: /
                  type: string
                locked:
                  description: If true, the user will be prevented from logging in
                  example: true
                  type: boolean
                nickname:
                  description: An optional nickname (e.g. 'David from Sales').
                  example: testnickname
                  type: string
                onboarding:
                  description: Set this to **true** to enable extra help popups in the web file manager for this user.
                  example: true
                  type: boolean
                password:
                  description: New password for the user
                  type: string
                permissions:
                  $ref: "#/components/schemas/UserPermissions"
                role:
                  description: The type of user (**admin** or **user**). Note that admin users cannot have a \`homeResource\` other than '/', and will have full permissions, but you must provide at least "download,upload,list,delete" in the \`permissions\` parameter.
                  enum:
                    - user
                    - admin
                  example: user
                  type: string
                timeZone:
                  description: |
                    Time zone, used for accurate time display within the application. See <a href='https://php.net/manual/en/timezones.php' target='blank'>this page</a> for allowed values.
                  example: America/Los_Angeles
                  type: string
                username:
                  description: |-
                    New username for the user. This should follow standard username conventions - spaces are not allowed, etc. We do allow email addresses as usernames.

                    **Note** Usernames must be unique across all ExaVault accounts.
                  example: testuser
                  type: string
              title: UpdateUserRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              example:
                data:
                  attributes:
                    accessTimestamp: 0000-00-00 00:00:00
                    accountName: exavault
                    created: 2020-07-27T14:50:39-07:00
                    email: test@example.com
                    expiration: 2020-08-29T17:00:00-07:00
                    firstLogin: false
                    homeDir: /
                    modified: 2020-07-27T14:50:39-07:00
                    nickname: exavaultnickname
                    onboarding: false
                    permissions:
                      changePassword: false
                      delete: false
                      deleteFormData: false
                      download: true
                      list: false
                      modify: false
                      notification: false
                      share: false
                      upload: true
                      viewFormData: false
                    role: user
                    status: 1
                    timeZone: America/Los_Angeles
                    username: exavaultuser
                  id: 124447
                  relationships:
                    homeResource:
                      data:
                        id: 2536831
                        type: resource
                    ownerAccount:
                      data:
                        id: 251
                        type: account
                  type: user
                included: []
                responseStatus: 200
              schema:
                $ref: "#/components/schemas/UserResponse"
          description: Successful Operation
      summary: Update a user
      tags:
        - Users
  /webhooks:
    get:
      description: "Returns a list of Webhooks. By default, this will return metadata on all Webhooks within the account. "
      operationId: getWehooksList
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
        - description: List of related record types to include. Valid options are \`owningAccount\` and \`resource\`
          in: query
          name: include
          schema:
            type: string
        - description: Records to skip before returning results.
          example: 100
          in: query
          name: offset
          schema:
            minimum: 0
            type: integer
        - description: Limit of the records list
          example: 10
          in: query
          name: limit
          schema:
            example: 100
            type: integer
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WebhookCollectionResponse"
          description: Successful Operation
      summary: Get Webhooks List
      tags:
        - Webhooks
    post:
      description: "Create a new Webhook on your account. Creating a Webhook will require an endpoint URL, a path, what events should trigger a webhook, and what request version to use. "
      operationId: addWebhook
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      requestBody:
        content:
          application/json:
            examples: {}
            schema:
              properties:
                endpointUrl:
                  description: The endpoint is where the webhook request will be sent.
                  example: https://example.com/webhook
                  format: uri
                  type: string
                resource:
                  description: Resource identifier for the top folder this webhook is associated with
                  example: /uploads-folder
                  type: string
                responseVersion:
                  description: What version of webhook request should be sent to the endpoint URL when messages are sent
                  enum:
                    - v1
                    - v2
                  example: v2
                  type: string
                triggers:
                  $ref: "#/components/schemas/WebhookTriggers"
              required:
                - endpointUrl
              title: AddWebhookRequestBody
              type: object
      responses:
        "201":
          content:
            application/json:
              examples:
                New webhook:
                  value:
                    data:
                      attributes:
                        created: 2021-03-04T22:22:00-08:00
                        endpointUrl: https://example.com/webhook
                        failed: true
                        modified: 2021-03-04T22:23:03-08:00
                        responseVersion: v2
                        triggers:
                          resources:
                            compress: true
                            copy: true
                            createFolder: true
                            delete: true
                            download: true
                            extract: true
                            move: true
                            rename: true
                            upload: true
                          shares:
                            formSubmit: true
                        verificationToken: 8df8200f7dee90ba4a41abe39c858c6c
                      id: 0
                      relationships:
                        ownerAccount:
                          data:
                            id: 5
                            type: account
                        resource:
                          data:
                            id: 234232
                            type: resource
                      type: webhook
                    included: []
                    responseStatus: 201
              schema:
                $ref: "#/components/schemas/WebhookResponse"
          description: Created
      summary: Add A New Webhook
      tags:
        - Webhooks
  "/webhooks/regenerate-token/{id}":
    parameters:
      - description: Webhook ID
        in: path
        name: id
        required: true
        schema:
          type: string
    post:
      description: "This endpoint will allow you to regenerate the security token for a webhook if you believe it’s been compromised in any way. "
      operationId: regenerateWebhookToken
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      responses:
        "200":
          content:
            application/json:
              examples:
                Success:
                  value:
                    data:
                      attributes:
                        created: 2021-03-04T22:22:00-08:00
                        endpointUrl: https://example.com/webhook
                        failed: true
                        modified: 2021-03-04T22:23:03-08:00
                        responseVersion: v2
                        triggers:
                          resources:
                            compress: true
                            copy: true
                            createFolder: true
                            delete: true
                            download: true
                            extract: true
                            move: true
                            rename: true
                            upload: true
                          shares:
                            formSubmit: true
                        verificationToken: 771820badeefa22a4a41abe39c858c6c
                      id: 0
                      relationships:
                        ownerAccount:
                          data:
                            id: 23422
                            type: account
                        resource:
                          data:
                            id: 134122
                            type: resource
                      type: webhook
                    included: []
                    responseStatus: 200
              schema:
                $ref: "#/components/schemas/WebhookResponse"
          description: Successful Operation
      summary: Regenerate security token
      tags:
        - Webhooks
  "/webhooks/resend/{activityId}":
    parameters:
      - description: Webhooks activity entry ID
        in: path
        name: activityId
        required: true
        schema:
          type: string
    post:
      description: This endpoint will allow you to resend a webhook that was previously sent. Resent webhooks will send exactly the same as the original webhook with the exception of the “sent” timestamp. Activity IDs can be retrieve from the webhook logs in your account or via GET /activity/webhooks
      operationId: resendWebhookActivityEntry
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Successful operation
      summary: Resend a webhook message
      tags:
        - Webhooks
  "/webhooks/{id}":
    delete:
      description: "Deleted the specified webhook. This will not affect logs or any resources the webhook is connected to. "
      operationId: deleteWebhook
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      responses:
        "200":
          content:
            application/json:
              examples:
                Delete operation OK:
                  value:
                    data: []
                    responseStatus: 200
              schema:
                $ref: "#/components/schemas/EmptyResponse"
          description: Sucessful operation
      summary: Delete a webhook
      tags:
        - Webhooks
    get:
      description: Returns the metadata for a specific webhook. Webhook IDs can be retrieve from GET /webhooks
      operationId: getWebhookById
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
        - description: " Include metadata for related items; \`ownerAccount\` and/or \`resource\` "
          in: query
          name: include
          schema:
            type: string
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WebhookResponse"
          description: Successful Operation
      summary: Get info for a webhook
      tags:
        - Webhooks
    parameters:
      - description: Webhook endpoint ID
        in: path
        name: id
        required: true
        schema:
          type: integer
    patch:
      description: |-
        Update the specified webhook. Updated webhooks will take effect immediately and could impact active workflows. Please be certain the webhook is not currently in use prior to updating.

        You only need to send the portions of the webhook configuration you wish to change, rather than the entire webhook object.
      operationId: updateWebhook
      parameters:
        - $ref: "#/components/parameters/apiKeyParam"
        - $ref: "#/components/parameters/accessTokenParam"
      requestBody:
        content:
          application/json:
            schema:
              description: ""
              properties:
                endpointUrl:
                  description: New endpoint URL to use for the webhook configuration
                  example: https://example.com/new-endpoint
                  format: uri
                  type: string
                resource:
                  description: Resource identifier of the top folder watched by this webhook.
                  example: /newfolder
                  type: string
                responseVersion:
                  description: Version of the webhooks message to send to the endpoint
                  enum:
                    - v2
                    - v1
                  example: v1
                  type: string
                triggers:
                  $ref: "#/components/schemas/WebhookTriggers"
              title: UpdateWebhookRequestBody
              type: object
      responses:
        "200":
          content:
            application/json:
              examples:
                Updated webhook:
                  value:
                    data:
                      attributes:
                        created: 2021-03-04T22:22:00-08:00
                        endpointUrl: https://example.com/new-endpoint
                        failed: true
                        modified: 2021-03-04T22:23:03-08:00
                        responseVersion: v1
                        triggers:
                          resources:
                            compress: true
                            copy: true
                            createFolder: true
                            delete: true
                            download: true
                            extract: true
                            move: true
                            rename: true
                            upload: true
                          shares:
                            formSubmit: true
                        verificationToken: 8df822322dee90ba4a41abe39c858c11
                      id: 0
                      relationships:
                        ownerAccount:
                          data:
                            id: 23422
                            type: account
                        resource:
                          data:
                            id: 433
                            type: resource
                      type: webhook
                    included: []
                    responseStatus: 200
              schema:
                $ref: "#/components/schemas/WebhookResponse"
          description: Successful Operation
      summary: Update a webhook
      tags:
        - Webhooks
components:
  examples:
    EmailListsExample:
      summary: Regular email list response
      value:
        data:
          - attributes:
              created: 2019-10-10T06:58:07Z
              emails:
                - jdoe@example.com
                - yk@example.com
              modified: 2019-10-10T06:58:07Z
              name: My friends
            id: 1
            relationships:
              owner:
                data:
                  id: 4
                  type: user
            type: emailList
        responseStatus: 200
    EmailListsInludedExample:
      summary: Email list reponse with included
      value:
        data:
          - attributes:
              created: 2019-10-10T06:58:07Z
              emails:
                - jdoe@example.com
                - yk@example.com
              modified: 2019-10-10T06:58:07Z
              name: My friends
            id: 1
            relationships:
              owner:
                data:
                  id: 4
                  type: user
            type: emailList
        included:
          - attributes:
              accessTimestamp: 2019-10-10T06:58:07Z
              accountId: 5
              accountName: jdoe
              created: 2019-10-10T06:58:07Z
              email: jdoe@example.com
              expiration: null
              firstLogin: false
              homeDir: /
              modified: 2019-10-10T06:58:07Z
              nickname: jdoe
              onboarding: false
              permissions:
                changePassword: true
                delete: true
                deleteFormData: true
                download: true
                list: true
                modify: true
                notification: true
                share: true
                upload: true
                viewFormData: true
              role: admin
              status: 1
              timeZone: America/Chicago
              username: john
            id: 4
            type: user
        responseStatus: 200
    FormExtendedResponseExample:
      summary: Form response with relationships
      value:
        data:
          attributes:
            cssStyles: |-
              #ev-widget-form {
                /*Change this to change the font. Remove to use your website font*/
                font-family: Helvetica Neue, sans-serif;
                /*Makes the form the same width as your website */
                margin: 0 -2%;
              } #ev-widget-form label{
                width: 100%;
              } #ev-widget-form input, #ev-widget-form textarea {
                /*Changes color and thickness of borders on form elements */
                border: 2px solid #ccc;
                /*Changes spacing inside the form elements (top/bottom and left/right */
                padding: 5px 5px;
                /* Changes how far away the inputs are from their label */
                margin-top: 2px;
              }
              #ev-widget-form input:focus, #ev-widget-form textarea:focus {
                /*Changes the color of the form elements when they are clicked in to */
                border: 2px solid #b2cf88;
                /*Removes glow effect from form elements that are clicked in to */
                outline: none;
              }
              #ev-widget-form label {
                font-size: 14px;
                font-weight: bold;
                /*Changes color of labels */
                color: #232323
              }
              #ev-widget-form .ev-form-element-description {
                /*Changes size of descriptions */
                font-size: 12px;
                /*Changes color of descriptions */
                color: #777;
                /* Changes how far away the descriptions are from their input */
                margin-top: 2px;
              }
              #ev-widget-form textarea {
                /* Makes textareas (multiline inputs) a taller. */
                min-height: 90px;
              }
            elements:
              - id: 123
                name: You name
                order: 1
                settings:
                  isRequired: true
                  senderEmail: false
                  useAsFolderName: false
                  width: 1
                type: name
              - id: 124
                name: Your Email
                order: 1
                settings:
                  description: Enter your email from the registration system
                  isRequired: true
                  senderEmail: true
                  useAsFolderName: true
                  width: 1
                type: email
            formDescription: Upload your photos to us
            submitButtonText: Send Files
            successMessage: Your files were uploaded
          id: 1
          relationships:
            share:
              data:
                id: 3322
                type: share
          type: form
        included:
          - attributes:
              accessDescription: Upload only
              accessMode:
                delete: false
                download: false
                modify: false
                upload: true
              embed: false
              expiration: null
              expired: false
              hasPassword: false
              hash: hd1e-3erufo72
              name: Shared folder
              ownerHash: hd1e-3erufo72-fsxak999
              public: true
            id: 3322
            type: share
        responseStatus: 200
    FormResponseExample:
      summary: Regular form response
      value:
        data:
          attributes:
            cssStyles: |-
              #ev-widget-form {
                /*Change this to change the font. Remove to use your website font*/
                font-family: Helvetica Neue, sans-serif;
                /*Makes the form the same width as your website */
                margin: 0 -2%;
              } #ev-widget-form label{
                width: 100%;
              } #ev-widget-form input, #ev-widget-form textarea {
                /*Changes color and thickness of borders on form elements */
                border: 2px solid #ccc;
                /*Changes spacing inside the form elements (top/bottom and left/right */
                padding: 5px 5px;
                /* Changes how far away the inputs are from their label */
                margin-top: 2px;
              }
              #ev-widget-form input:focus, #ev-widget-form textarea:focus {
                /*Changes the color of the form elements when they are clicked in to */
                border: 2px solid #b2cf88;
                /*Removes glow effect from form elements that are clicked in to */
                outline: none;
              }
              #ev-widget-form label {
                font-size: 14px;
                font-weight: bold;
                /*Changes color of labels */
                color: #232323
              }
              #ev-widget-form .ev-form-element-description {
                /*Changes size of descriptions */
                font-size: 12px;
                /*Changes color of descriptions */
                color: #777;
                /* Changes how far away the descriptions are from their input */
                margin-top: 2px;
              }
              #ev-widget-form textarea {
                /* Makes textareas (multiline inputs) a taller. */
                min-height: 90px;
              }
            elements:
              - id: 123
                name: You name
                order: 1
                settings:
                  isRequired: true
                  senderEmail: false
                  useAsFolderName: false
                  width: 1
                type: name
              - id: 124
                name: Your Email
                order: 1
                settings:
                  description: Enter your email from the registration system
                  isRequired: true
                  senderEmail: true
                  useAsFolderName: true
                  width: 1
                type: email
            formDescription: Upload your photos to us
            submitButtonText: Send Files
            successMessage: Your files were uploaded
          id: 1
          relationships:
            share:
              data:
                id: 3
                type: share
          type: form
        responseStatus: 200
    ShareCollectionResponseExample:
      summary: Regular share collection response
      value:
        data:
          - attributes:
              accessDescription: Upload only
              accessMode:
                delete: false
                download: false
                modify: false
                upload: true
              created: 2017-04-21T10:53:47Z
              embed: true
              expiration: null
              expired: false
              fileDropCreateFolders: false
              hasNotification: true
              hasPassword: false
              hash: sdg1-352
              inherited: false
              messages:
                - body: You have files available for download.
                  created: 2017-04-21T10:53:47Z
                  id: 23
                  modified: 2017-04-21T10:53:47Z
                  subject: Message subject.
              modified: 2017-04-21T10:53:47Z
              name: Example Share
              ownerHash: hd1e-3erufo72-fsxak999
              paths:
                - /example share
              public: true
              recipients:
                - created: 2017-04-21T10:53:47Z
                  email: recipient@example.com
                  hash: fseowxan
                  id: 11
                  received: false
                  sent: true
                  type: direct
              requireEmail: false
              resent: null
              status: 1
              type: shared_folder
            id: 10
            relationships:
              notifications:
                - id: 14
                  type: notification
                - id: 15
                  type: notification
              owner:
                id: 12
                type: user
              resource:
                id: 13
                type: resource
            type: share
        responseStatus: 200
        returnedResults: 2
        totalResults: 2
    ShareExtendedCollectionResponseExample:
      summary: Share collection response with relationships
      value:
        data:
          - attributes:
              accessDescription: Upload only
              accessMode:
                delete: false
                download: false
                modify: false
                upload: true
              created: 2017-04-21T10:53:47Z
              embed: true
              expiration: null
              expired: false
              fileDropCreateFolders: false
              hasNotification: true
              hasPassword: false
              hash: sdg1-352
              inherited: false
              messages:
                - body: You have files available for download.
                  created: 2017-04-21T10:53:47Z
                  id: 23
                  modified: 2017-04-21T10:53:47Z
                  subject: Message subject.
              modified: 2017-04-21T10:53:47Z
              name: Example Share
              ownerHash: hd1e-3erufo72-fsxak999
              paths:
                - /example share
              public: true
              recipients:
                - created: 2017-04-21T10:53:47Z
                  email: recipient@example.com
                  hash: fseowxan
                  id: 11
                  received: false
                  sent: true
                  type: direct
              requireEmail: false
              resent: null
              status: 1
              type: shared_folder
            id: 10
            relationships:
              notifications:
                - id: 14
                  type: notification
                - id: 15
                  type: notification
              owner:
                id: 12
                type: user
              resources:
                id: 13
                type: resource
            type: share
        included:
          - attributes:
              accessTimestamp: 2019-09-06T11:40:29Z
              created: 2019-05-29T20:48:57Z
              email: user@example.com
              expiration: 2020-04-21T10:53:47Z
              firstLogin: false
              homeDir: /
              modified: 2019-07-27T01:03:41Z
              nickname: examplenickname
              onboarding: true
              permissions:
                changePassword: true
                delete: true
                deleteFormData: true
                download: true
                list: true
                modify: true
                notification: true
                share: true
                upload: true
                viewFormData: true
              role: master
              status: 0
              timeZone: UTC
              username: exampleuser
            id: 12
            type: user
          - attributes:
              accessedAt: 2019-05-29T20:48:57Z
              createdAt: 2019-05-29T20:48:57Z
              extension: null
              fileCount: 1
              hash: ec4aa9a91be282666a165899a14f29b1
              name: Shared Folder
              path: /Shared Folder
              previewable: false
              size: 987
              type: folder
              updatedAt: 2019-05-29T20:48:57Z
              uploadDate: 2019-05-29T20:48:57Z
            id: 13
            type: resource
          - attributes:
              action: upload
              created: 2019-05-29T20:48:57Z
              message: null
              name: Shared Folder
              path: /Shared Folder
              readableDescription: null
              readableDescriptionWithoutPath: null
              recipientEmails:
                - recipient@example.com
              recipients:
                - created: 2019-05-29T20:48:57Z
                  email: recipient@example.com
                  id: 18
                  modified: 2019-05-29T20:48:57Z
                  notificationId: 14
              sendEmail: 1
              type: shared_folder
              updated: 2019-05-29T20:48:57Z
              usernames:
                - notice_user_all
            id: 14
            type: notification
          - attributes:
              action: upload
              created: 2019-05-29T20:48:57Z
              message: null
              name: Shared Folder2
              path: /Shared Folder2
              readableDescription: null
              readableDescriptionWithoutPath: null
              recipientEmails:
                - recipient@example.com
              recipients:
                - created: 2019-05-29T20:48:57Z
                  email: recipient@example.com
                  id: 18
                  modified: 2019-05-29T20:48:57Z
                  notificationId: 14
              sendEmail: 1
              type: shared_folder
              updated: 2019-05-29T20:48:57Z
              usernames:
                - notice_user_all
            id: 15
            type: notification
        responseStatus: 200
        returnedResults: 2
        totalResults: 2
    ShareExtendedResponseExample:
      summary: Share response with relationships
      value:
        data:
          attributes:
            accessDescription: Upload only
            accessMode:
              delete: false
              download: false
              modify: false
              upload: true
            created: 2017-04-21T10:53:47Z
            embed: true
            expiration: null
            expired: false
            fileDropCreateFolders: false
            hasNotification: true
            hasPassword: false
            hash: sdg1-352
            inherited: false
            messages:
              - body: You have files available for download.
                created: 2017-04-21T10:53:47Z
                id: 23
                modified: 2017-04-21T10:53:47Z
                subject: Message subject.
            modified: 2017-04-21T10:53:47Z
            name: Example Share
            ownerHash: hd1e-3erufo72-fsxak999
            paths:
              - /example share
            public: true
            recipients:
              - created: 2017-04-21T10:53:47Z
                email: recipient@example.com
                hash: fseowxan
                id: 11
                received: false
                sent: true
                type: direct
            requireEmail: false
            resent: null
            status: 1
            type: shared_folder
          id: 10
          relationships:
            notifications:
              - id: 14
                type: notification
              - id: 15
                type: notification
            owner:
              id: 12
              type: user
            resources:
              id: 13
              type: resource
          type: share
        included:
          - attributes:
              accessTimestamp: 2019-09-06T11:40:29Z
              created: 2019-05-29T20:48:57Z
              email: user@example.com
              expiration: 2020-04-21T10:53:47Z
              firstLogin: false
              homeDir: /
              modified: 2019-07-27T01:03:41Z
              nickname: examplenickname
              onboarding: true
              permissions:
                changePassword: true
                delete: true
                deleteFormData: true
                download: true
                list: true
                modify: true
                notification: true
                share: true
                upload: true
                viewFormData: true
              role: master
              status: 0
              timeZone: UTC
              username: exampleuser
            id: 12
            type: user
          - attributes:
              accessedAt: 2019-05-29T20:48:57Z
              createdAt: 2019-05-29T20:48:57Z
              extension: null
              fileCount: 1
              hash: ec4aa9a91be282666a165899a14f29b1
              name: Shared Folder
              path: /Shared Folder
              previewable: false
              size: 987
              type: folder
              updatedAt: 2019-05-29T20:48:57Z
              uploadDate: 2019-05-29T20:48:57Z
            id: 13
            type: resource
          - attributes:
              action: upload
              created: 2019-05-29T20:48:57Z
              message: null
              name: Shared Folder
              path: /Shared Folder
              readableDescription: null
              readableDescriptionWithoutPath: null
              recipientEmails:
                - recipient@example.com
              recipients:
                - created: 2019-05-29T20:48:57Z
                  email: recipient@example.com
                  id: 18
                  modified: 2019-05-29T20:48:57Z
                  notificationId: 14
              sendEmail: 1
              type: shared_folder
              updated: 2019-05-29T20:48:57Z
              usernames:
                - notice_user_all
            id: 14
            type: notification
          - attributes:
              action: upload
              created: 2019-05-29T20:48:57Z
              message: null
              name: Shared Folder2
              path: /Shared Folder2
              readableDescription: null
              readableDescriptionWithoutPath: null
              recipientEmails:
                - recipient@example.com
              recipients:
                - created: 2019-05-29T20:48:57Z
                  email: recipient@example.com
                  id: 18
                  modified: 2019-05-29T20:48:57Z
                  notificationId: 14
              sendEmail: 1
              type: shared_folder
              updated: 2019-05-29T20:48:57Z
              usernames:
                - notice_user_all
            id: 15
            type: notification
        responseStatus: 200
    ShareResponseExample:
      summary: Regular share response
      value:
        data:
          attributes:
            accessDescription: Upload only
            accessMode:
              delete: false
              download: false
              modify: false
              upload: true
            created: 2017-04-21T10:53:47Z
            embed: true
            expiration: null
            expired: false
            fileDropCreateFolders: false
            hasNotification: true
            hasPassword: false
            hash: sdg1-352
            inherited: false
            messages:
              - body: You have files available for download.
                created: 2017-04-21T10:53:47Z
                id: 23
                modified: 2017-04-21T10:53:47Z
                subject: Message subject.
            modified: 2017-04-21T10:53:47Z
            name: Example Share
            ownerHash: hd1e-3erufo72-fsxak999
            paths:
              - /example share
            public: true
            recipients:
              - created: 2017-04-21T10:53:47Z
                email: recipient@example.com
                hash: fseowxan
                id: 11
                received: false
                sent: true
                type: direct
            requireEmail: false
            resent: null
            status: 1
            type: shared_folder
          id: 10
          relationships:
            notifications:
              - id: 14
                type: notification
              - id: 15
                type: notification
            owner:
              id: 12
              type: user
            resource:
              id: 13
              type: resource
          type: share
        responseStatus: 200
  parameters:
    accessTokenParam:
      description: Access token required to make the API call.
      example: 5dc97cc607985eb8da033220e7447647e7915fbf73808
      in: header
      name: ev-access-token
      required: true
      schema:
        type: string
    apiKeyParam:
      description: API key required to make the API call.
      in: header
      name: ev-api-key
      required: true
      schema:
        type: string
  requestBodies:
    AccountBody:
      content:
        application/json:
          schema:
            properties:
              accountOnboarding:
                example: true
                type: boolean
              allowedIpRanges:
                properties:
                  ipEnd:
                    example: 255.255.255.255
                    format: ipv4
                    type: string
                  ipStart:
                    example: 127.0.0.1
                    format: ipv4
                    type: string
                type: object
              brandingSettings:
                properties:
                  companyName:
                    example: null
                    type: string
                  customEmail:
                    example: custom@example.com
                    format: email
                    type: string
                  logo:
                    example: examplelogo.png
                    type: string
                  logoExt:
                    example: png
                    type: string
                  theme:
                    example: default
                    type: string
                title: BrandingSettings
                type: object
              complexPasswords:
                example: false
                type: boolean
              customSignature:
                example: null
                type: string
              emailContent:
                example: "Great news, your new account is ready! For your records, we've listed information you'll use to log in below: FTP Server: [[ftpserver]] Username (Web and FTP access): [[username]] [[setpassword]]"
                type: string
              emailSubject:
                example: ExaVault File Sharing Account
                type: string
              externalDomain:
                items: {}
                type: array
              quotaNoticeThreshold:
                example: 90
                type: integer
              secureOnly:
                example: false
                type: boolean
              showReferralLinks:
                example: false
                type: boolean
            type: object
  schemas:
    AccessMode:
      description: An object defining what a not-logged-in visitor can do with the share contents
      properties:
        delete:
          description: Whether share allows visitors to delete contents
          type: boolean
        download:
          description: Whether share allows visitors to download
          type: boolean
        modify:
          description: Whether share allows visitors to rename or move contents.
          type: boolean
        upload:
          description: Whether share allows visitors to upload
          type: boolean
      title: AccessMode
      type: object
    Account:
      description: Object contains all account properties.
      properties:
        attributes:
          $ref: "#/components/schemas/AccountAttributes"
        id:
          description: Account ID
          example: 13758
          format: int32
          type: integer
        relationships:
          properties:
            masterUser:
              properties:
                data:
                  properties:
                    id:
                      description: ID of master user for account
                      type: integer
                    type:
                      enum:
                        - user
                      example: user
                      type: string
                  type: object
              type: object
          title: MasterUser
          type: object
        type:
          description: Type of item. "account"
          enum:
            - account
          type: string
      title: Account
      type: object
    AccountAttributes:
      description: ""
      properties:
        accountName:
          description: Name of the account
          type: string
        accountOnboarding:
          description: Whether the web application onboarding help is enabled for new users in the account.
          example: false
          type: boolean
        allowedIp:
          description: Range of IP addresses allowed to access this account.
          example:
            - ipEnd: 192.30.24.5
              ipStart: 192.30.23.2
          items:
            properties:
              ipEnd:
                type: string
              ipStart:
                type: string
            type: object
          type: array
        branding:
          description: Branding flag. Set to \`true\` if the account has branding functionality enabled.
          enum:
            - true
            - false
          example: true
          type: boolean
        brandingSettings:
          $ref: "#/components/schemas/BrandingSettings"
        clientId:
          description: (ExaVault Use Only) Internal ID of the account in CMS.
          example: 1
          format: int32
          type: integer
        complexPasswords:
          description: Flag to indicate whether the account requires complex passwords. Set to \`true\` to require complex passwords on all users and shares.
          example: false
          type: boolean
        created:
          description: Timestamp of account creation.
          example: 2017-01-12T09:06:21Z
          format: date-time
          type: string
        customDomain:
          description: Custom domain flag. Set to \`true\` if account type allows custom domain functionality.
          enum:
            - true
            - false
          example: true
          type: boolean
        customSignature:
          description: Custom signature for all account emails users or recipients will receive.
          example: null
          type: string
        externalDomains:
          description: Custom domain used to brand this account.
          example: []
          items:
            type: string
          type: array
        maxUsers:
          description: Maximum number of users the account can have. This can be increased by contacting ExaVault Support.
          example: 1000
          format: int32
          type: integer
        modified:
          description: Timestamp of account modification.
          example: 2017-06-03T20:42:05Z
          format: date-time
          type: string
        planDetails:
          $ref: "#/components/schemas/PlanDetails"
        quota:
          $ref: "#/components/schemas/Quota"
        secureOnly:
          description: Flag to indicate whether the account disables connections via insecure protocols (e.g. FTP). Set to \`true\` to disable all traffic over port 21.
          example: false
          type: boolean
        showReferralLinks:
          description: Flag to indicate showing of referrals links in the account. Set to \`true\` to include marketing messages in share invitations.
          example: true
          type: boolean
        status:
          description: Account status flag. A one (1) means the account is active; zero (0) means it is suspended.
          enum:
            - 1
            - 0
          example: 1
          format: int32
          type: integer
        userCount:
          description: Current number of users on the account.
          example: 3
          format: int32
          type: integer
        welcomeEmailContent:
          description: Content of welcome email each new user will receive.
          example: Welcome to your new account!
          type: string
        welcomeEmailSubject:
          description: Subject of welcome email each new user will receive.
          example: ExaVault File Sharing Account
          type: string
      title: ""
      type: object
    AccountResponse:
      properties:
        data:
          $ref: "#/components/schemas/Account"
        included:
          description: Array can contain objects specified in include param of the get call e.g User object
          items:
            $ref: "#/components/schemas/User"
          type: array
        responseStatus:
          example: 200
          type: integer
      title: AccountResponse
      type: object
    BrandingSettings:
      properties:
        companyName:
          example: null
          type: string
        customEmail:
          example: custom@example.com
          format: email
          type: string
        logo:
          example: examplelogo.png
          type: string
        logoExt:
          example: png
          type: string
        theme:
          example: default
          type: string
        verifiedDomain:
          type: string
        verifiedDomainId:
          type: string
        verifiedDomainValid:
          type: boolean
      title: BrandingSettings
      type: object
    EmailList:
      description: A single email group list
      properties:
        attributes:
          $ref: "#/components/schemas/EmailListAttributes"
        id:
          description: ID of the email list
          type: integer
        relationships:
          $ref: "#/components/schemas/EmailListRelationships"
        type:
          description: Type of record. "emailList"
          type: string
      title: EmailList
      type: object
    EmailListAttributes:
      description: Information for the email list, including its short title and recipient emails
      properties:
        created:
          description: Created datetime
          format: date-time
          type: string
        emails:
          description: Recipient emails in the email list
          items:
            type: string
          type: array
        modified:
          description: Modified datetime
          format: date-time
          type: string
        name:
          description: Short title for email list
          type: string
      title: EmailListAttributes
      type: object
    EmailListCollectionResponse:
      description: Response object for list of email lists
      properties:
        data:
          items:
            $ref: "#/components/schemas/EmailList"
          type: array
        included:
          items:
            $ref: "#/components/schemas/User"
          type: array
        responseStatus:
          description: Http status of response
          type: integer
        returnedResults:
          minimum: 0
          type: integer
        totalResults:
          minimum: 0
          type: integer
      title: EmailListCollectionResponse
      type: object
    EmailListOwnerUser:
      description: Information for user who owns the email list
      properties:
        data:
          $ref: "#/components/schemas/RelationshipData"
      title: EmailListOwnerUser
      type: object
    EmailListRelationships:
      description: Related record summary info
      properties:
        ownerUser:
          $ref: "#/components/schemas/EmailListOwnerUser"
      title: EmailListRelationships
      type: object
    EmailListResponse:
      description: Response object for a single email list.
      properties:
        data:
          $ref: "#/components/schemas/EmailList"
        included:
          items:
            $ref: "#/components/schemas/User"
          type: array
        responseStatus:
          description: Http Status code
          example: 200
          format: int32
          type: integer
      title: EmailListResponse
      type: object
    EmptyResponse:
      properties:
        data:
          example: []
          items:
            type: string
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
      title: EmptyResponse
      type: object
    Error:
      properties:
        code:
          description: Specific internal error string.
          example: <_ERROR_CODE>
          type: string
        detail:
          description: human-readable explanation specific to this occurrence of the problem.
          example: <_DETAIL>
          type: string
        meta:
          description: Meta object containing non-standard meta-information about the error.
          example: <_META_OBJECT>
          type: object
        title:
          description: Human readable summary of the problem.
          example: <_TITLE>
          type: string
      title: Error
      type: object
    Form:
      description: Regular form object.
      properties:
        attributes:
          $ref: "#/components/schemas/FormAttributes"
        id:
          description: ID of the form.
          example: 823752
          format: int32
          type: integer
        relationships:
          description: "Share relationship data of the form. "
          properties:
            share:
              properties:
                data:
                  properties:
                    id:
                      description: "ID of the share. "
                      example: 22
                      type: integer
                    type:
                      description: "Type is share. "
                      enum:
                        - share
                      example: share
                      type: string
                  type: object
              type: object
          type: object
        type:
          description: Type is "form".
          example: form
          type: string
      title: Form
      type: object
    FormAttributes:
      description: Attributes of the form including it's included fields and css styles
      properties:
        cssStyles:
          description: CSS Styles of the form.
          example: |-
            #ev-widget-form {
              /*Change this to change the font. Remove to use your website font*/
              font-family: Helvetica Neue, sans-serif;
              /*Makes the form the same width as your website */
              margin: 0 -2%;
            }
            #ev-widget-form label{
              width: 100%;
            }
            #ev-widget-form input,
            #ev-widget-form textarea {
              /*Changes color and thickness of borders on form elements */
              border: 2px solid #ccc;
              /*Changes spacing inside the form elements (top/bottom and left/right */
              padding: 5px 5px;
              /* Changes how far away the inputs are from their label */
              margin-top: 2px;
            }

            #ev-widget-form input:focus,
            #ev-widget-form textarea:focus {
              /*Changes the color of the form elements when they are clicked in to */
              border: 2px solid #b2cf88;
              /*Removes glow effect from form elements that are clicked in to */
              outline: none;
            }

            #ev-widget-form label {
              font-size: 14px;
              font-weight: bold;
              /*Changes color of labels */
              color: #232323
            }

            #ev-widget-form .ev-form-element-description {
              /*Changes size of descriptions */
              font-size: 12px;
              /*Changes color of descriptions */
              color: #777;
              /* Changes how far away the descriptions are from their input */
              margin-top: 2px;
            }

            #ev-widget-form textarea {
              /* Makes textareas (multiline inputs) a taller. */
              min-height: 90px;
            }
          type: string
        elements:
          description: Array of form fields defined for the form
          example:
            - id: 234
              name: Project ID
              order: 0
              settings:
                description: null
                isRequired: false
                useAsFolderName: false
                width: 1
              type: name
            - id: 235
              name: Your Email
              order: 1
              setings:
                description: Enter your email from the registration system
                isRequired: true
                senderEmail: true
                useAsFolderName: true
                width: 1
              type: email
            - id: 236
              name: Upload Area
              order: 2
              settings:
                fileTypes: null
              type: upload_area
          items:
            $ref: "#/components/schemas/FormField"
          type: array
        formDescription:
          description: Text that appears at the top of a receive form
          example: Upload your photos to us
          type: string
        submitButtonText:
          description: Text that appears on the submit button for the form
          example: Send Files
          type: string
        successMessage:
          description: Message displayed to submitter after files are uploaded
          example: Your files were uploaded
          type: string
      title: FormAttributes
      type: object
    FormEntry:
      description: Contains the data submitted for a form.
      properties:
        attributes:
          properties:
            created:
              description: Timestamp of the submission
              example: 2019-09-19T18:00:00Z
              format: date-time
              type: string
            fields:
              items:
                $ref: "#/components/schemas/FormEntryField"
              type: array
            modified:
              description: Timestamp of the field modified date
              example: 2019-09-20T18:00:00Z
              format: date-time
              type: string
            paths:
              description: Full paths to files associated with the form submission
              example:
                - /image1.jpg
                - /image2.jpg
                - /image3.jpg
              items:
                type: string
              type: array
            status:
              description: Form entry status
              enum:
                - pending
                - completed
              example: completed
              type: string
          type: object
        id:
          description: Form entry id
          example: 12345
          format: int64
          type: integer
        type:
          description: Type of item. "formEntry"
          example: formEntry
          type: string
      title: FormEntry
      type: object
    FormEntryField:
      description: Attributes of the form including its included fields and css styles
      properties:
        name:
          description: Field name
          example: Email Adress
          type: string
        order:
          description: Field order in the form
          example: 1
          format: int32
          type: integer
        value:
          description: Field value
          example: example@example.com
          type: string
      title: FormEntryField
      type: object
    FormEntryResponse:
      description: Response object of the form data.
      example:
        data:
          - attributes:
              created: 2020-09-15T05:36:41-07:00
              fields:
                - name: Email Address
                  order: 1
                  value: test451@example.com
              modified: 2020-09-16T05:36:44-07:00
              paths:
                - /example/test451@example.com/1.csv
                - /example/test451@example.com/2.csv
              status: completed
            id: 320721
            type: formEntry
          - attributes:
              created: 2020-09-16T05:36:41-07:00
              fields:
                - name: Email Address
                  order: 1
                  value: test455@example.com
              modified: 2020-09-17T05:36:44-07:00
              paths:
                - /example/test455@example.com/1.csv
                - /example/test455@example.com/2.csv
              status: completed
            id: 32021
            type: formEntry
        responseStatus: 200
        returnedResults: 2
        totalResults: 2
      properties:
        data:
          description: Object submissions data for form.
          items:
            $ref: "#/components/schemas/FormEntry"
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
        returnedResults:
          description: "Number of returned results. "
          example: 2
          type: integer
        totalResults:
          description: "Total results found. "
          example: 2
          type: integer
      title: FormEntryResponse
      type: object
    FormField:
      properties:
        id:
          description: "ID of the form field. "
          example: 1185
          format: int32
          type: integer
        name:
          description: Label of the field.
          example: Your Name
          type: string
        order:
          description: Order that field appears on the form, starting from 0
          example: 0
          format: int32
          type: integer
        settings:
          description: Advanced field settings
          properties:
            description:
              description: Secondary description of field.
              example: null
              type: string
            isRequired:
              description: Whether this field must be completed before form can be submitted
              example: false
              type: boolean
            senderEmail:
              type: boolean
            useAsFolderName:
              description: Whether to place submitted files into a subfolder named the contents of this field. Only takes effect when the \`fileDropCreateFolders\` parameter on the receive folder is \`true\`. \`isRequired\` must be set to \`true\` if this setting is \`true\`.
              example: false
              type: boolean
            width:
              description: How much of the available width the field should occupy
              example: 0.5
              format: float
              type: number
          type: object
        type:
          description: Field type
          enum:
            - email
            - textarea
            - name
            - text
      title: FormField
      type: object
    FormFieldUploadArea:
      properties:
        id:
          description: "ID of the form field. "
          example: 1103
          format: int32
          type: integer
        name:
          description: Label of the field (not used).
          example: Upload Area
          type: string
        order:
          description: Order that field appears on the form, starting from 0
          example: 0
          format: int32
          type: integer
        settings:
          description: Advanced field settings
          properties:
            fileTypes:
              description: File types that can be uploaded. Comma-delimited string of MIME file types.
              example: null
              type: string
          type: object
        type:
          description: Type is upload_area.
          enum:
            - upload_area
      title: FormFieldUploadArea
    FormResponse:
      description: Response object for forms.
      properties:
        data:
          $ref: "#/components/schemas/Form"
        included:
          items:
            $ref: "#/components/schemas/Share"
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
      title: Regular form response
      type: object
    Notification:
      description: Object containing notification properties.
      properties:
        attributes:
          $ref: "#/components/schemas/NotificationAttributes"
        id:
          example: 1
          format: int32
          type: integer
        relationships:
          properties:
            ownerUser:
              properties:
                data:
                  properties:
                    id:
                      example: 12345
                      type: integer
                    type:
                      enum:
                        - user
                      example: user
                      type: string
                  type: object
              type: object
            resource:
              properties:
                data:
                  properties:
                    id:
                      example: 2345
                      format: int64
                      type: integer
                    type:
                      example: resource
                      type: string
                  type: object
              type: object
            share:
              properties:
                data:
                  properties:
                    id:
                      example: 2
                      format: int32
                      type: integer
                    type:
                      example: share
                      type: string
                  type: object
              type: object
          type: object
        type:
          example: notification
          type: string
      title: Notification
      type: object
    NotificationAttributes:
      description: "Attributes for the notification including the path, recipients, and share data. "
      properties:
        action:
          description: Action that triggers notification.
          enum:
            - upload
            - download
            - delete
            - all
          example: all
          type: string
        created:
          description: Timestamp of notifiction creation.
          example: 2011-03-21T00:18:56Z
          format: date-time
          type: string
        message:
          description: Custom message that will be sent to the notification recipients.
          example: null
          type: string
        modified:
          description: Timestamp of notification modification.
          example: 2011-03-21T00:18:56Z
          format: date-time
          type: string
        name:
          description: Name of the item that the notification is set on.
          example: examplefolder
          type: string
        path:
          description: Path to the item that the notification is set on.
          example: /examplefolder
          type: string
        readableDescription:
          description: Human readable description of the notification.
          example: anybody changes, downloads or deletes '/examplefile.jpg'
          type: string
        readableDescriptionWithoutPath:
          description: Human readable description of the notification without item path.
          example: anybody changes or downloads this file
          type: string
        recipients:
          description: Notification recipients.
          items:
            $ref: "#/components/schemas/NotificationRecipient"
          type: array
        sendEmail:
          description: Whether or not an email will send when the notification is triggered.
          enum:
            - true
            - false
          example: true
          type: boolean
        shareId:
          description: ID of the share that the notification belogns to.
          example: null
          type: string
        type:
          description: "Type of the resource the notification is attached to. "
          enum:
            - file
            - folder
            - shared_folder
            - send_receipt
            - share_receipt
            - file_drop
          example: folder
          type: string
        userId:
          description: ID of the user that the notification belongs to.
          example: 2
          type: string
        usernames:
          description: Detail on which users can trigger the notification.
          example:
            - notice_user_all
          items:
            type: string
          type: array
      title: NotificationAttributes
      type: object
    NotificationCollectionResponse:
      description: Response object for notifications collection.
      properties:
        data:
          items:
            $ref: "#/components/schemas/Notification"
          type: array
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/Share"
              - $ref: "#/components/schemas/User"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
        returnedResults:
          description: Number of returned results.
          example: 2
          type: integer
        totalResults:
          description: "Total results found. "
          example: 2
          type: integer
      title: NotificationCollectionResponse
      type: object
    NotificationRecipient:
      properties:
        created:
          description: Timestamp of adding notification recipient.
          example: 2011-03-21T00:18:56Z
          format: date-time
          type: string
        email:
          description: Recipient email.
          example: exampleuser@example.com
          type: string
        id:
          description: ID of the recipient.
          example: 2
          format: int32
          type: integer
        modified:
          description: Timestamp of notification recipient modification.
          example: 2011-03-21T00:18:56Z
          format: date-time
          type: string
        notificationId:
          description: ID of the notification that the recipient belongs to.
          example: 23
          type: integer
      title: NotificationRecipient
      type: object
    NotificationResponse:
      description: Response object for notifications.
      properties:
        data:
          $ref: "#/components/schemas/Notification"
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/Share"
              - $ref: "#/components/schemas/User"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
      title: NotificationResponse
      type: object
    PlanDetails:
      properties:
        apiKeys:
          type: integer
        apiTokens:
          type: integer
        colorSchema:
          type: boolean
        customDomain:
          type: boolean
        customName:
          type: boolean
        directLinks:
          type: boolean
        ipWhitelist:
          type: boolean
        sharingOptions:
          items:
            type: string
          type: array
        sshKeys:
          type: integer
        storageAddOn:
          type: integer
        unlimitedUsers:
          type: boolean
        userExpiration:
          type: boolean
        userImport:
          type: boolean
        webhookOptions:
          properties:
            amount:
              type: integer
            includeTriggers:
              type: string
            restrictionTypes:
              items:
                type: string
              type: array
          type: object
      title: PlanDetails
      type: object
    PreviewFile:
      description: Object with preview image properties.
      properties:
        attributes:
          properties:
            image:
              description: Binary image content, base64 encoded.
              example: iVBORw0KGgoAAAANSUhEUgAAACIAAAAoCAYAAACb3CikAAAABGdBTUEAALGPC
              type: string
            imageHash:
              description: hash of the image.
              example: 6afaa3ef4056dc602ccfc69ab52d6f40
              type: string
            pageCount:
              description: Amount of pages available in the file. Used only for multipage documents.
              example: 10
              format: int32
              type: integer
            size:
              description: Size of the image in bytes.
              example: 2186
              format: int64
              type: integer
          type: object
        id:
          example: 1
          format: int64
          type: integer
        type:
          example: preview
          type: string
      title: PreviewFile
      type: object
    PreviewFileResponse:
      description: Response object for preview file
      properties:
        data:
          $ref: "#/components/schemas/PreviewFile"
        responseStatus:
          description: HTTP Status Code
          example: 200
          type: integer
      title: PreivewFileResponse
      type: object
    Quota:
      properties:
        bandwidthLimit:
          description: Total number of bytes that can be transferred per month.
          format: int64
          type: integer
        bandwidthUsed:
          description: Number of bytes transferred this month.
          format: int64
          type: integer
        diskLimit:
          description: Amount of disk space that the account has available to it. This may be increased by upgrading to a larger plan.
          example: 375809638400
          format: int64
          type: integer
        diskUsed:
          description: Amount of disk space currently in use.
          example: 1225352192
          format: int64
          type: integer
        noticeEnabled:
          description: Should a quota warning be sent to the account owner when a threshold level of space utilization is reached?
          example: true
          type: boolean
        noticeThreshold:
          description: Treshold that triggers a quota notification. This represents the "percent full" your account must be before the quota notification is generated.
          example: 80
          format: int32
          type: integer
        transactionsLimit:
          description: Total number of transactions allowed in a 24-hour period.
          format: int32
          type: integer
        transactionsNoticeEnabled:
          description: Whether an email should be sent to the account owner up to once per day if transaction usage exceeds \`transactionsNoticeThreshold\` value.
          type: boolean
        transactionsNoticeThreshold:
          description: Percent of daily transactions limit that will trigger an email if activity exceeds it.
          format: int32
          type: integer
      title: Quota
      type: object
    RelationshipData:
      description: Identifying info for related record
      properties:
        id:
          description: ID number of related record
          type: integer
        type:
          description: Kind of record
          type: string
      title: RelationshipData
      type: object
    Resource:
      description: All properties of the resource.
      properties:
        attributes:
          $ref: "#/components/schemas/ResourceAttributes"
        id:
          example: 1
          format: int64
          type: integer
        relationships:
          properties:
            directFile:
              properties:
                data:
                  properties:
                    id:
                      example: 2
                      format: int32
                      type: integer
                    type:
                      example: directFile
                      type: string
                  type: object
              type: object
            notifications:
              items:
                properties:
                  data:
                    properties:
                      id:
                        example: 2
                        format: int32
                        type: integer
                      type:
                        example: notification
                        type: string
                    type: object
                type: object
              type: array
            parentResource:
              properties:
                data:
                  properties:
                    id:
                      example: 2
                      format: int64
                      type: integer
                    type:
                      example: resource
                      type: string
                  type: object
              type: object
            share:
              properties:
                data:
                  properties:
                    id:
                      example: 2345
                      format: int32
                      type: integer
                    type:
                      example: share
                      type: string
                  type: object
              type: object
          type: object
        type:
          description: Type of item. "resource"
          enum:
            - resource
          example: resource
          type: string
      title: Resource
      type: object
    ResourceAttributes:
      description: Attributes of resource
      properties:
        accessedAt:
          description: Date-time of the time when resource was accessed.
          example: 2011-03-21T00:18:56-07:00
          format: date-time
          type: string
        accessedTime:
          description: UNIX timestamp of last access
          format: int32
          type: integer
        createdAt:
          description: Date-time of resource creation.
          example: 2011-03-21T00:18:56-07:00
          format: date-time
          type: string
        createdBy:
          description: Username of the creator.
          example: exampleuser
          type: string
        createdTime:
          description: UNIX timestamp of resource creation
          format: int32
          type: integer
        extension:
          description: Resource extension. Property exists only if resource \`type\` is file.
          type: string
        fileCount:
          description: Number of files within folder. null if resource type is a file.
          type: integer
        hash:
          description: Unique hash of the resource.
          example: ec4aa9a91be282666a165899a14f29b1
          type: string
        name:
          description: Resource name, e.g. the name of the file or folder.
          example: examplefolder
          type: string
        path:
          description: Full path to the resource.
          example: /examplefolder
          type: string
        previewable:
          description: Can resource be previewed. Property equals \`null\` if resource \`type\` is dir.
          enum:
            - true
            - false
          example: true
          type: boolean
        size:
          description: Resource size in bytes
          example: 0
          format: int64
          type: integer
        type:
          description: Type of the resource.
          enum:
            - file
            - dir
          type: string
        updatedAt:
          description: Date-time of resource modification.
          example: 2011-03-21T00:18:56-07:00
          format: date-time
          type: string
        updatedTime:
          description: UNIX timestamp of resource modification
          format: int32
          type: integer
        uploadDate:
          description: Timestamp of resource upload.
          example: 2011-03-21T00:18:56-07:00
          format: date-time
          type: string
      title: ResourceAttributes
      type: object
    ResourceCollectionResponse:
      description: Response object for collection of resources.
      properties:
        data:
          items:
            $ref: "#/components/schemas/Resource"
          type: array
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/User"
              - $ref: "#/components/schemas/Account"
              - $ref: "#/components/schemas/Resource"
              - $ref: "#/components/schemas/Notification"
              - $ref: "#/components/schemas/Share"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
        returnedResults:
          description: Count of returned results.
          example: 2
          type: integer
        totalResults:
          description: Total count of results found.
          example: 2
          type: integer
      title: ResourceCollectionResponse
      type: object
    ResourceCopyMove:
      description: Resource which was successfully copied or moved.
      properties:
        data:
          $ref: "#/components/schemas/Resource"
        meta:
          description: Meta object containing non-standard meta-information about the operation.
          example:
            id: 2321
          type: object
      title: ResourceCopyMove
      type: object
    ResourceDelete:
      description: All properties of the resource delete object
      properties:
        id:
          example: 1
          format: int64
          type: integer
        meta:
          description: Meta object containing non-standard meta-information about the delete operation.
          example:
            id: 2321
          type: object
        type:
          description: Type of item. "resource"
          enum:
            - resource
          example: resource
          type: string
      title: ResourceDelete
      type: object
    ResourceMultiResponse:
      properties:
        responses:
          items:
            anyOf:
              - $ref: "#/components/schemas/ResourceDelete"
              - $ref: "#/components/schemas/Error"
            discriminator:
              propertyName: responseStatus
          type: array
      title: ResourceDeleteMultiResponse
      type: object
    ResourceResponse:
      description: Response object for resources.
      properties:
        data:
          $ref: "#/components/schemas/Resource"
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/User"
              - $ref: "#/components/schemas/Account"
              - $ref: "#/components/schemas/Resource"
              - $ref: "#/components/schemas/Notification"
              - $ref: "#/components/schemas/Share"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
      title: ResourceResponse
      type: object
    SSHKey:
      description: Object representing an SSH Key associated with a user.
      properties:
        attributes:
          $ref: "#/components/schemas/SSHKeyAttributes"
        id:
          description: ID of the key.
          example: 655621
          format: int32
          type: integer
        relationships:
          properties:
            ownerUser:
              properties:
                data:
                  properties:
                    id:
                      type: integer
                    type:
                      type: string
                  type: object
              type: object
          type: object
        type:
          description: "Type of the object. "
          enum:
            - sshKey
          example: sshKey
          type: string
      title: SSH Key
      type: object
    SSHKeyAttributes:
      properties:
        created:
          description: The date-time the SSH Key was created.
          format: date-time
          type: string
        fingerprint:
          description: "The Key Fingerprint. The fingerprint can be used to identify and keep track of the key without exposing the actual credential. "
          type: string
        lastLogin:
          description: "The date-time the SSH Key was last used to access ExaVault. "
          format: date-time
          type: string
      title: SSHKeysAttributes
      type: object
    SSHKeyCollectionResponse:
      properties:
        data:
          items:
            $ref: "#/components/schemas/SSHKey"
          type: array
        included:
          items:
            $ref: "#/components/schemas/User"
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
        returnedResults:
          description: Number of returned results.
          example: 2
          type: integer
        totalResults:
          description: "Total results found. "
          example: 2
          type: integer
      title: SSHKeyCollectionResponse
      type: object
    SSHKeyResponse:
      properties:
        data:
          $ref: "#/components/schemas/SSHKey"
        included:
          items:
            $ref: "#/components/schemas/User"
          type: array
        responseStatus:
          description: Http status code of the response.
          type: integer
      title: SSHKeyResponse
      type: object
    SessionActivityEntry:
      description: Single entry of session activity
      properties:
        attributes:
          properties:
            bytesTransferred:
              example: 10815676
              format: int64
              type: integer
            created:
              example: 2019-10-18T06:48:40Z
              type: string
            duration:
              example: 5
              type: integer
            fileName:
              example: /test2/Cassandra2020The20Definitive20Guide.2030947496.pdf
              type: string
            fileSource:
              example: ""
              type: string
            ipAddress:
              example: 185.223.113.224
              type: string
            operation:
              example: PASS
              type: string
            protocol:
              example: web
              type: string
            sessionId:
              example: 5da9b4a8bd961dfa0a56fa0dc15aaffe57069271b389e
              type: string
            status:
              example: "-"
              type: string
            username:
              example: ykravchuk
              type: string
          type: object
        id:
          example: 12345
          format: int64
          type: integer
        type:
          enum:
            - sessionActivity
          example: sessionActivity
          type: string
      title: SessionActivityEntry
      type: object
    SessionActivityResponse:
      description: Session activity list response
      properties:
        data:
          items:
            $ref: "#/components/schemas/SessionActivityEntry"
          type: array
        responseStatus:
          example: 200
          type: integer
        returnedResults:
          example: 2
          type: integer
        totalResults:
          example: 2
          type: integer
      title: SessionActivityResponse
      type: object
    Share:
      description: Object contains share properties.
      properties:
        attributes:
          $ref: "#/components/schemas/ShareAttributes"
        id:
          description: ID of the share.
          example: 655621
          format: int32
          type: integer
        relationships:
          description: "Message, owner, resource, and notification relationships of the share. "
          properties:
            messages:
              items:
                properties:
                  data:
                    properties:
                      id:
                        description: ID of the message.
                        example: 21
                        type: integer
                      type:
                        description: "Type is message. "
                        enum:
                          - message
                        example: message
                        type: string
                    title: ShareMessageData
                    type: object
                title: ShareRelationshipsMessage
                type: object
              type: array
            notifications:
              items:
                properties:
                  data:
                    properties:
                      id:
                        description: "ID of the notification. "
                        example: 9
                        type: integer
                      type:
                        description: "Type is notification. "
                        enum:
                          - notification
                        example: notification
                        type: string
                    type: object
                title: ShareRelationshipsNotification
                type: object
              type: array
            owner:
              properties:
                data:
                  properties:
                    id:
                      description: ID of the owner.
                      example: 12345
                      type: integer
                    type:
                      description: Type is user.
                      type: string
                  type: object
              title: ShareRelationshipsOwner
              type: object
            resources:
              items:
                properties:
                  data:
                    properties:
                      id:
                        description: ID of the shared resource.
                        example: 12345
                        format: int64
                        type: integer
                      type:
                        description: "Type is resource. "
                        enum:
                          - resource
                        example: resource
                        type: string
                    title: ShareResourceData
                    type: object
                title: ShareRelationshipsResource
                type: object
              type: array
          title: ShareRelationships
          type: object
        type:
          description: "Type of the share. "
          enum:
            - share
          example: share
          type: string
      title: Share
      type: object
    ShareAttributes:
      description: "Attributes of the share including the name, path and share recipients. "
      properties:
        accessDescription:
          description: Description of the share access rights.
          example: Download only
          type: string
        accessMode:
          $ref: "#/components/schemas/AccessMode"
        created:
          description: Timestamp of share creation.
          example: 2017-01-28T13:10:47Z
          format: date-time
          type: string
        embed:
          description: True if share can be embedded.
          example: false
          type: boolean
        expiration:
          description: Expiration date of the share.
          example: null
          type: string
        expired:
          description: True if the share has expired.
          enum:
            - true
            - false
          example: false
          type: boolean
        fileDropCreateFolders:
          description: Flag to show if separate folders should be created for each file upload to receive folder.
          enum:
            - true
            - false
          example: false
          type: boolean
        formId:
          description: ID of the form.
          type: integer
        hasNotification:
          description: True if share has notification.
          enum:
            - true
            - false
          example: false
          type: boolean
        hasPassword:
          description: True if the share has password.
          enum:
            - true
            - false
          example: false
          type: boolean
        hash:
          description: Share hash.
          example: hd1e-3erufo72
          type: string
        inherited:
          description: True if share inherited from parent folder.
          enum:
            - true
            - false
          example: false
          type: boolean
        messages:
          description: Array of invitation messages.
          items:
            $ref: "#/components/schemas/ShareMessage"
          type: array
        modified:
          description: Timestamp of share modification. Can be \`null\` if it wasn't modified.
          example: null
          format: date-time
          type: string
        name:
          description: Share name.
          example: Example Folder
          type: string
        ownerHash:
          description: Share owner's hash.
          example: hd1e-3erufo72-fsxak999
          type: string
        paths:
          description: Path to the shared resource in your account.
          example:
            - /Example Folder
          items:
            type: string
          type: array
        public:
          description: True if the share has a public url.
          enum:
            - true
            - false
          example: true
          type: boolean
        recipients:
          description: Array of recipients.
          example:
            - created: 2017-04-21T10:53:47Z
              email: recipient@example.com
              hash: fseowxan
              id: 2
              received: false
              sent: true
              shareId: 23
              type: direct
          items:
            $ref: "#/components/schemas/ShareRecipient"
          type: array
        requireEmail:
          description: True if share requires email to access.
          example: true
          type: boolean
        resent:
          description: Invitations resent date. Can be \`null\` if resent never happened.
          example: null
          format: date-time
          type: string
        status:
          description: Share activity status. Can be active (1) or deactivated (0).
          enum:
            - 0
            - 1
          example: 1
          format: int32
          type: integer
        trackingStatus:
          description: Checks recipient received status and returns whether it's been received (\`complete\`,) partial received (\`incomplete\`,) or not received yet (\`pending\`.)
          enum:
            - complete
            - incomplete
            - pending
          type: string
        type:
          description: Type of share.
          enum:
            - shared_folder
            - send
            - receive
          example: shared_folder
          type: string
      title: ShareAttributes
      type: object
    ShareCollectionResponse:
      properties:
        data:
          items:
            $ref: "#/components/schemas/Share"
          type: array
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/User"
              - $ref: "#/components/schemas/Notification"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
        returnedResults:
          description: Number of returned results.
          example: 2
          type: integer
        totalResults:
          description: "Total results found. "
          example: 2
          type: integer
      title: ShareCollectionResponse
      type: object
    ShareMessage:
      properties:
        body:
          description: Share invitation message text.
          example: You have files available for download.
          type: string
        created:
          description: Timestamp of message creation.
          example: 2017-01-26T18:10:47Z
          format: date-time
          type: string
        id:
          description: Message id.
          example: 397584
          format: int32
          type: integer
        modified:
          description: Timestamp of message modification.
          example: 2017-01-28T13:10:47Z
          format: date-time
          type: string
        shareId:
          description: ID of associated share
          example: 3544253
          format: int32
          type: integer
        subject:
          description: Share invitation message subject.
          example: Files available for download
          type: string
        userId:
          description: User ID who generated share invite
          example: 119394
          format: int32
          type: integer
      title: Message
      type: object
    ShareRecipient:
      properties:
        created:
          description: Timestamp of adding recipient to the share.
          example: 2017-01-26T18:10:47Z
          format: date-time
          type: string
        email:
          description: Recipient email address.
          example: recipient@example.com
          type: string
        hash:
          description: Share hash.
          example: fseowxan
          type: string
        id:
          description: ID of the recipient.
          example: 2
          format: int32
          type: integer
        received:
          description: Set to true if recipient has accessed the share. Note this is set to true when the recipient clicks the link to access the share; not when they download a file.
          enum:
            - true
            - false
          example: false
          type: boolean
        sent:
          description: Set to true if invite email was sent; false otherwise.
          enum:
            - true
            - false
          example: true
          type: boolean
        shareId:
          description: ID of the share that the recipoient belongs to.
          example: 23
          type: string
        type:
          description: Type of the recipient.
          enum:
            - owner
            - direct
          example: owner
          type: string
      title: ShareRecipient
      type: object
    ShareRecipientsResponse:
      properties:
        data:
          example:
            - test+3@example.com
            - test+4@example.com
          items:
            format: email
            type: string
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
      title: ShareRecipientsResponse
      type: object
    ShareResponse:
      description: Response object for shares.
      properties:
        data:
          $ref: "#/components/schemas/Share"
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/User"
              - $ref: "#/components/schemas/Notification"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
      title: ShareResponse
      type: object
    User:
      description: Object contains user properties.
      properties:
        attributes:
          $ref: "#/components/schemas/UserAttributes"
        id:
          description: ID of the user.
          example: 655621
          format: int32
          type: integer
        relationships:
          description: "Home resource and owner account relationship data for the user. "
          properties:
            homeResource:
              properties:
                data:
                  properties:
                    id:
                      description: ID of home directory resource.
                      format: int64
                      type: integer
                    type:
                      description: Type is resource.
                      enum:
                        - resource
                      example: resource
                      type: string
                  type: object
              type: object
            ownerAccount:
              properties:
                data:
                  properties:
                    id:
                      description: ID of the account.
                      format: int32
                      type: integer
                    type:
                      description: Type is account.
                      enum:
                        - account
                      example: account
                      type: string
                  type: object
              type: object
          required:
            - ownerAccount
          type: object
        type:
          description: Type of object being returned. Always "user"
          example: user
          type: string
      title: User
      type: object
    UserAttributes:
      description: "Attributes of the user including expiration, home directory, and permissions. "
      properties:
        accessTimestamp:
          description: Timestamp of most recent successful user login.
          example: 2011-03-21T00:18:56-07:00
          type: string
        accountName:
          description: Name of the account this user belongs to.
          example: exampleaccount
          type: string
        created:
          description: Timestamp of user creation.
          example: 2018-07-27T15:43:55-07:00
          format: date-time
          type: string
        email:
          description: Email address of the user.
          example: example@exavault.mail
          type: string
        expiration:
          description: Timestamp of user expiration.
          example: 2020-06-30T13:33:30-07:00
          type: string
        firstLogin:
          description: "\`true\` if the user has logged into the system."
          example: false
          type: boolean
        homePath:
          description: Path to the user's home folder.
          example: /
          type: string
        locked:
          description: "\`true\` if the user is locked and cannot log in."
          example: false
          type: boolean
        modified:
          description: Timestamp of user modification.
          example: 2018-07-29T15:43:55-07:00
          format: date-time
          type: string
        nickname:
          description: Nickname of the user.
          example: exampleuser
          type: string
        onboarding:
          description: Whether the onboarding help system is enabled for this user. \`true\` means that additional help popups are displayed in the web application for this user.
          example: false
          type: boolean
        permissions:
          $ref: "#/components/schemas/UserPermissions"
        role:
          description: User's access level
          enum:
            - user
            - admin
            - master
          example: user
          type: string
        status:
          description: Indicates user activity status. \`0\` means the user is locked and cannot log in. \`1\` means the user is active and can log in.
          enum:
            - 0
            - 1
          example: 1
          format: int32
          type: integer
        timeZone:
          description: User's timezone. See <a href='https://php.net/manual/en/timezones.php' target='blank'>this page</a> for allowed values.
          example: America/Chicago
          type: string
        username:
          description: Username of the user.
          example: exampleuser
          type: string
      required:
        - status
        - created
        - modified
        - accountName
        - username
        - nickname
        - homeResource
        - permissions
        - role
        - timeZone
        - onboarding
      title: UserAttributes
      type: object
    UserCollectionResponse:
      properties:
        data:
          items:
            $ref: "#/components/schemas/User"
          type: array
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/Account"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
        returnedResults:
          description: Number of results returned.
          example: 2
          type: integer
        totalResults:
          description: Total results found.
          example: 2
          type: integer
      type: object
    UserPermissions:
      properties:
        changePassword:
          description: Change (own) password permission flag
          type: boolean
        delete:
          description: Delete permission flag
          type: boolean
        deleteFormData:
          description: Delete form data permission flag. If true, user can remove data that was submitted for a receive folder. This applies only to data submitted in the receive folder form, not the actual files uploaded.
          type: boolean
        download:
          description: Download permission flag
          type: boolean
        list:
          description: View folder contents permission flag
          type: boolean
        modify:
          description: Modify permission flag
          type: boolean
        notification:
          description: Notifications permission flag
          type: boolean
        share:
          description: Sharing permission flag
          type: boolean
        upload:
          description: Upload permission flag
          type: boolean
        viewFormData:
          description: Access Form Data permission flag. If true, user can view submissions that have been stored for a receive folder. This includes any data submitted in the receive folder form.
          type: boolean
      required:
        - download
        - upload
        - modify
        - delete
        - list
        - changePassword
        - share
        - notification
        - viewFormData
        - deleteFormData
      title: UserPermissions
      type: object
    UserResponse:
      description: Response object for users.
      properties:
        data:
          $ref: "#/components/schemas/User"
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/Account"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: Http code for the response.
          example: 200
          type: integer
      title: UserResponse
      type: object
    Webhook:
      properties:
        attributes:
          $ref: "#/components/schemas/WebhookAttributes"
        id:
          type: integer
        relationships:
          properties:
            ownerAccount:
              properties:
                data:
                  properties:
                    id:
                      description: Account ID
                      example: 23422
                      type: integer
                    type:
                      description: Type of thing it is "account"
                      example: account
                      type: string
                  type: object
              type: object
            resource:
              properties:
                data:
                  properties:
                    id:
                      description: ID of the resource associated with the webhook
                      example: 134122
                      type: integer
                    type:
                      description: Type of thing it is. "resource"
                      example: resource
                      type: string
                  type: object
              type: object
          type: object
        type:
          description: Type of thing it is. "webhook"
          example: webhook
          type: string
      title: Webhook
      type: object
    WebhookActivityAttributesV1:
      properties:
        accountId:
          description: Unique ID of account
          type: string
        attemptId:
          description: Event - retry identifier
          type: string
        created:
          description: Date and time of webhook message being generated by system
          type: string
        details:
          properties:
            accountName:
              description: Account master username
              type: string
            attempt:
              description: Number of times the system has attempted to send
              type: integer
            attemptId:
              description: Entry - retry identifier
              type: string
            event:
              description: Type of related activity
              type: string
            protocol:
              description: Type of connection used for related activity
              type: string
            username:
              description: Username logged for related activity. May refer to someone who is not a user of the account, such as a share recipient or "publ
              type: string
          title: WebhookV1Details
          type: object
        endpointUrl:
          description: The URL the message was sent to
          format: uri
          type: string
        event:
          description: Event type
          enum:
            - resources.upload
            - resources.download
            - resources.delete
            - resources.rename
            - resources.copy
            - resources.move
            - resources.compress
            - resources.extract
            - resources.createFolder
            - shares.formSubmit
          type: string
        ipAddress:
          description: IP Address of related activity
          type: string
        resend:
          description: Whether this attempt was a re-send of a previous attempt
          type: boolean
        resourcePath:
          description: Path of resource that matched webhook
          type: string
        response:
          description: Body of web response returned by webhook listener
          type: string
        status:
          description: HTTP Status Code returned by webhook listener
          type: integer
        username:
          description: Username of related activity
          type: string
        webhookFormat:
          description: What version of webhook message is being sent \`v1\`
          type: string
        webhookId:
          description: Unique ID of webhook configuration
          type: integer
        webhookPath:
          description: Path that webhook is watching
          type: string
      title: WebhookActivityAttributesV1
      type: object
    WebhookActivityAttributesV2:
      properties:
        accountId:
          description: Unique ID of account
          type: string
        attemptId:
          description: Event - retry identifier
          type: string
        created:
          description: Date and time of webhook message being generated by system
          type: string
        details:
          properties:
            accountName:
              description: Account master username
              type: string
            attemptId:
              description: Entry - retry identifier
              type: string
            event:
              description: Type of related activity
              type: string
            eventData:
              properties:
                formDetails:
                  items:
                    type: object
                  type: array
                resources:
                  items:
                    properties:
                      accessedAt:
                        description: Date and time resource was most recently downloaded
                        format: date-time
                        type: string
                      createdAt:
                        description: Date and time of resource creation
                        format: date-time
                        type: string
                      createdBy:
                        description: Username who originally created resource
                        type: string
                      fileCount:
                        description: Number of resources contained in this folder. If this is a file, fileCount is null
                        type: integer
                      hash:
                        description: Resource hash value
                        type: string
                      id:
                        description: Resource ID
                        type: integer
                      name:
                        description: Resource name
                        type: string
                      path:
                        description: Full path to resource
                        type: string
                      previewable:
                        description: Whether the resource can be previewed
                        type: boolean
                      size:
                        description: Size of resource in bytes
                        format: int32
                        type: integer
                      type:
                        description: Type of resource \`file\` or \`dir\`
                        type: string
                      updatedAt:
                        description: Date and time resource was most recently changed
                        format: date-time
                        type: string
                      uploadDate:
                        description: Date resource was first uploaded
                        format: date-time
                        type: string
                    type: object
                  type: array
                share:
                  items:
                    properties:
                      accessDescription:
                        description: Human readable description of what visitors are allowed to do with the receive folder
                        type: string
                      accessMode:
                        $ref: "#/components/schemas/AccessMode"
                      assets:
                        description: List of items included in the share
                        items:
                          type: string
                        type: array
                      created:
                        description: Date and ti
                        format: date-time
                        type: string
                      embed:
                        description: Whether the receive folder can be embedded within a web page
                        type: boolean
                      expiration:
                        description: "Date and time when the receive folder will no longer be "
                        type: string
                      expired:
                        description: Whether access to the receive folder has expired
                        type: boolean
                      fileDropCreateFolders:
                        description: Whether files should be automatically placed in subfolders of the receive folder
                        type: boolean
                      formId:
                        description: ID of the associated form
                        type: integer
                      hasNotification:
                        description: Whether delivery receipts are enabled for this share
                        type: boolean
                      hasPassword:
                        description: Whether the receive folder requires visitors to enter a password
                        type: boolean
                      hash:
                        description: Hash value of the receive
                        type: string
                      id:
                        description: Unique ID of associated receive folder
                        type: integer
                      inherited:
                        description: Whether this share is inherited from a parent fol
                        type: boolean
                      isPublic:
                        description: Whether visitors can acccess the receive folder without an invitation link
                        type: boolean
                      messages:
                        description: Invitation messages sent for receive folder
                        items:
                          $ref: "#/components/schemas/ShareMessage"
                        type: array
                      modified:
                        description: Date and time when the share was last changed
                        format: date-time
                        type: string
                      name:
                        description: Name of receiv
                        type: string
                      ownerHash:
                        description: Hash value of the user who "owns" the receive fo
                        type: string
                      paths:
                        description: List
                        items:
                          type: string
                        type: array
                      recipients:
                        description: List of recipients invited  to the receive folder
                        items:
                          $ref: "#/components/schemas/ShareRecipient"
                        type: array
                      requireEmail:
                        description: Whether visitors must enter their email addresses to access the receive folder
                        type: boolean
                      resent:
                        description: Whether invitations to the receive folder have been re-sent to recipients
                        type: boolean
                      status:
                        description: 1 if share is active. 0 if not.
                        type: integer
                      trackingStatus:
                        description: Status of invitations sent for this receive folder
                        type: string
                      type:
                        description: Type of share **"receive"**
                        type: string
                    type: object
                  type: array
                transferStatus:
                  description: For uploads, and downloads, whether the file transferred OK. \`success\` means the transfer did not have errors
                  type: string
              title: WebhookV2EventData
              type: object
            eventTimestamp:
              description: Date and time event originally took place
              format: date-time
              type: string
            ipAddress:
              description: IP address of related activity
              type: string
            protocol:
              description: Type of connection used for related activity
              type: string
            username:
              description: Username logged for related activity. May refer to someone who is not a user of the account, such as a share recipient or "publ
              type: string
          title: WebhookV2Details
          type: object
        endpointUrl:
          description: The URL the message was sent to
          format: uri
          type: string
        event:
          description: Event type
          enum:
            - resources.upload
            - resources.download
            - resources.delete
            - resources.rename
            - resources.copy
            - resources.move
            - resources.compress
            - resources.extract
            - resources.createFolder
            - shares.formSubmit
          type: string
        ipAddress:
          description: IP Address of related activity
          type: string
        resend:
          description: Whether this attempt was a re-send of a previous attempt
          type: boolean
        resourcePath:
          description: Path of resource that matched webhook
          type: string
        response:
          description: Body of web response returned by webhook listener
          type: string
        status:
          description: HTTP Status Code returned by webhook listener
          type: integer
        username:
          description: Username of related activity
          type: string
        webhookFormat:
          description: What version of webhook message is being sent \`v2\`
          type: string
        webhookId:
          description: Unique ID of webhook configuration
          type: integer
        webhookPath:
          description: Path that webhook is watching
          type: string
      title: WebhookActivityAttributesV2
      type: object
    WebhookActivityEntry:
      properties:
        attributes:
          discriminator:
            propertyName: webhookFormat
          oneOf:
            - $ref: "#/components/schemas/WebhookActivityAttributesV2"
            - $ref: "#/components/schemas/WebhookActivityAttributesV1"
        id:
          example: 12345
          format: int64
          type: integer
        type:
          enum:
            - webhookActivity
          example: webhookActivity
          type: string
      title: WebhookActivityEntry
      type: object
    WebhookActivityResponse:
      description: Session activity list response
      properties:
        data:
          items:
            $ref: "#/components/schemas/WebhookActivityEntry"
          type: array
        responseStatus:
          description: Http status code of the response.
          example: 200
          type: integer
        returnedResults:
          description: "Number of results returned. "
          example: 2
          type: integer
        totalResults:
          description: Total results found.
          example: 2
          type: integer
      title: WebhookActivityResponse
      type: object
    WebhookAttributes:
      properties:
        created:
          description: Timestamp when webhook configuration was added to system.
          example: 2021-03-04T22:22:00-08:00
          format: date-time
          type: string
        endpointUrl:
          description: The endpoint is where the webhook request will be sent.
          example: https://example.com/webhook
          format: uri
          type: string
        failed:
          description: Whether webhook has been disabled for too many consecutive failures
          type: boolean
        modified:
          description: Timestamp when webhook configuration was last modified
          example: 2021-03-04T22:23:03-08:00
          format: date-time
          type: string
        responseVersion:
          description: The version of webhook request to send to the endpoint URL
          enum:
            - v1
            - v2
          example: v2
          type: string
        triggers:
          $ref: "#/components/schemas/WebhookTriggers"
        verificationToken:
          description: Token for verifying sender is ExaVault
          example: 8df8200f7dee90ba4a41abe39c858c6c
          type: string
      title: WebhookAttributes
      type: object
      x-examples: {}
    WebhookCollectionResponse:
      properties:
        data:
          items:
            $ref: "#/components/schemas/Webhook"
          type: array
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/Account"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
        returnedResults:
          description: Number of results returned.
          example: 2
          type: integer
        totalResults:
          description: Total results found.
          example: 2
          type: integer
      type: object
    WebhookResponse:
      properties:
        data:
          items:
            $ref: "#/components/schemas/Webhook"
          type: array
        included:
          items:
            anyOf:
              - $ref: "#/components/schemas/Account"
              - $ref: "#/components/schemas/Resource"
            discriminator:
              propertyName: type
          type: array
        responseStatus:
          description: "Http status code of the response. "
          example: 200
          type: integer
      type: object
    WebhookTriggers:
      properties:
        resources:
          properties:
            compress:
              description: Send webhook messages when resources are compressed into an archive.
              type: boolean
            copy:
              description: Send webhook messages when resources are copied.
              type: boolean
            createFolder:
              description: Send webhook messages when a new folder is created.
              type: boolean
            delete:
              description: Send webhook messages when resources are deleted
              type: boolean
            download:
              description: Send webhook messages when resources are downloaded.
              type: boolean
            extract:
              description: Send webhook messages when resources are extracted from an archive.
              type: boolean
            move:
              description: Send webhook messages when resources are moved.
              type: boolean
            rename:
              description: Send webhook messages when resources are renamed.
              type: boolean
            upload:
              description: Send webhook messages when resources are uploaded.
              type: boolean
          type: object
        shares:
          properties:
            formSubmit:
              description: Send webhook messages when a receive folder form is submitted.
              type: boolean
          type: object
      title: WebhookTriggers
      type: object`;
const prefix = def.slice(0, 5000);
const suffix = def.slice(5000);

// buildPrompt({ prefix, suffix, maxTokens: 4000 });

export function buildPrompt({ prefix, suffix, maxTokens }) {
  const content = `${prefix}${suffix}`;

  const componentsStart = content.search(/\ncomponents:\n/);

  const componentEndRegex = /\n\w|$/g;
  componentEndRegex.lastIndex = componentsStart + "\ncomponents:\n".length;
  const { index: componentsEnd } = componentEndRegex.exec(content);

  const components = content.slice(componentsStart + 1, componentsEnd);
  const componentsList = components.replaceAll(/ {6,}.*?(\n|$)/g, "");
  const componentsSnippet =
    "# Consider available components:\n" +
    componentsList
      .split("\n")
      // Remove empty lines
      .filter((line) => line.length > 0)
      // Remove colon in the component names
      .map((line) => (line.startsWith("    ") ? line.slice(0, -1) : line))
      .map((line) => "# " + line)
      .join("\n") +
    "\n";

  const { text: componentsSnippetTruncated, length: componentsSnippetTokens } =
    truncateToTokenLength(componentsSnippet, MAX_COMPONENTS_TOKENS, "right");

  // const maxTokensPerSide = Math.floor(maxTokens / 2);
  // const maxPrefixTokens = maxTokensPerSide - componentsSnippetTokens;
  // const maxSuffixTokens = maxTokensPerSide;

  const maxPrefixTokens = Math.floor(maxTokens * 0.8) - componentsSnippetTokens;
  const maxSuffixTokens = Math.floor(maxTokens * 0.2);

  const promptPrefix =
    componentsSnippetTruncated +
    truncateToTokenLength(prefix, maxPrefixTokens, "left").text;
  const { text: promptSuffix } = truncateToTokenLength(
    suffix,
    maxSuffixTokens,
    "right"
  );

  return {
    promptPrefix,
    promptSuffix,
  };
}
