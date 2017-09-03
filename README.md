# Introduction  
This project downloads metadata from Salesforce orgs and can run test cases.

It should work out of the box with Jenkins, I have tried it with some modifications with Visualstudio.com but ran into troubles regarding commiting back to the built in GIT repository.

## Prerequisities
You need a Jenkins instance with Ant and Git, optionally you can add the Slack notifier to get notifications in Slack about the jobs.

Add these 3 global variables to Jenkins (Under http://jenkinsinstance/jenkins/configure)
1. GIT_PATH = your_absolute_path_to_git
2. GIT_USER_EMAIL = email_address_of_your_git_user
3. GIT_USER_NAME = full_name_of_your_git_user

## Setting up a metadata retreive job
1. Create a new job in Jenkins.
2. Check the "This project is parameterized" checkbox
3. Add 2 String parameters
    1. SF_SERVERURL = https://login.salesforce.com  
    (If you're taking a backup from a sandbox login should be test)
    2. SF_ENVIRONMENTNAME = {whatever_you_like}  
    (The environmentname is just a string used to give your backup a unique path (src/$SF_ENVIRONMENTNAME))

4. Set up your Source Code Management, this should be git since we're commiting to git in the end.
5. Add "Check out to specific local branch" = master, this will make sure that we'll commit back to master later
6. Add a build trigger, Build periodically is the one I recommend
7. Under Build Environment, check "Use secret text(s) or file(s)"
8. Add a "Username and password (separated)" binding with the following information:
    1. Username Variable = SF_USERNAME
    2. Password Variable = SF_PASSWORD
    3. Credentials = Specific credentials  
    (Make sure to add your Salesforce credentials for this specific Salesforce org, it can be done by clicking the (Key)Add button)
9. Under Build, add
    1. Execute shell
    ```sh generate_build_properties.sh```
    2. Invoce Ant
    Targets
    ```retrieveUnpackaged -lib lib\ant-salesforce.jar;lib\ant-contrib-1.0b3.jar```
    3. Execute shell
    ```sh commit_to_git.sh```
10. Under Post-build Actions, add Git Publisher
    Push Only if Build Succeeds: checked
    Merge Results: checked
    Branches
    1. Branch to push: master
    2. Target remote name: origin
11. Optionally add the Slack Notifications post build step.

## Setting up a job for running test cases
1. Repeat steps 1 to 8 from the metadata retreive job (or clone it if you're lazy). You don't need the SF_ENVIRONMENTNAME parameter in step 3 and you can skip step 5 since we're not commiting anything.
2. Under Build, add
    1.  Execute shell
    ```sh generate_build_properties.sh```
    2. Invoce Ant
    Targets
    ```deployCodeCheckOnly -lib lib\ant-salesforce.jar;lib\ant-contrib-1.0b3.jar```
3. Optionally add the Slack Notifications post build step.