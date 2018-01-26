# Make sure your build environment sets GIT_PATH and other environment variables before executing this script
set +x
git config user.email "${GIT_USER_EMAIL}"
git config user.name "${GIT_USER_NAME}"
echo `git add src/${SF_ENVIRONMENTNAME} -A && git commit -am "Commiting build ${SF_ENVIRONMENTNAME}/${BUILD_ID} to git"`
