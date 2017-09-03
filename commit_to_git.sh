# Make sure your build environment sets GIT_PATH and other environment variables before executing this script
set +x
${GIT_PATH} config user.email "${GIT_USER_EMAIL}"
${GIT_PATH} config user.name "${GIT_USER_NAME}"
echo `${GIT_PATH} add src/${SF_ENVIRONMENTNAME} -A && ${GIT_PATH} commit -am "Commiting build ${SF_ENVIRONMENTNAME}/${BUILD_ID} to git"`
