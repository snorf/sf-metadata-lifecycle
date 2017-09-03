# Creates a build.properties file containing credentials
# set +x makes sure it's not echoed into Jenkins console
set +x
echo "I solemnly swear that I will not echo passwords to the console"
echo "sf.serverurl = ${SF_SERVERURL}" > build.properties
echo "sf.username = ${SF_USERNAME}" >> build.properties
echo "sf.password = ${SF_PASSWORD}" >> build.properties
echo "sf.environmentname" = ${SF_ENVIRONMENTNAME} >> build.properties
