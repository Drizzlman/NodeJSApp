For generating models:
sequelize-auto -o "./models" -d sequelize_auto_test -h localhost -u my_username -p 5432 -x my_password -e postgres
npx sequelize-auto -o "./models" -d nodeJsApp -h localhost -u postgres -p 5432 -x admin -e postgres -l es6