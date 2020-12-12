set -e

DAY=$1;
PREVDAY=$(($DAY-1));

cp -r template "src/day$DAY";
touch "data/day$DAY.txt";
sed -e "s/\(import day$PREVDAY from \".\/day$PREVDAY\";\)/\1 import day$DAY from \".\/day$DAY\";/g" -i "" src/app.ts
sed -e "s/\(  \"$PREVDAY\": day$PREVDAY,\)/\1 \"$DAY\": day$DAY/g" -i "" src/app.ts
./node_modules/.bin/prettier -w src/app.ts