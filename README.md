# Awesome


Application Specific
---

URI : /thaisamut/{rs,web,pub}/{domain}/{version?}/{resource}/{sub-resource}

    {rs,web,pub} = Restful, Web(HTML), Public Resources(statics, images, js, css, fonts)
    {domain} = awesome
    
eg., 
     /thaisamut/rs/awesome/v1/menu
     /thaisamut/web/awesome/index.html  <-- no versioning
     /thaisamut/pub/awesome/css
     /thaisamut/pub/awesome/js
     /thaisamut/pub/awesome/fonts
     /thaisamut/pub/awesome/jsbuilt
     /thaisamut/pub/awesome/images


HTTP Method
---

    GET - read
    PUT - create
    POST - update
    DELETE - delete


How to start the application
---

1. Run `mvn clean install` to build your application
2. Start application with `java -jar target/msa-awesome-0.1-SNAPSHOT.jar server config/dev.yml`
3. To check that your application is running enter url `http://localhost:2000`


Health Check
---

To see your applications health enter url `http://localhost:3000/healthcheck`


Requirements
---

   Java12
   Maven 3.6


Quickly Start
---

   mvn compile exec:java


Debug
---

   export MAVEN_OPTS="-Xms64m -Xmx512m -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"


Database
---

    sudo -u postgres psql -c "CREATE DATABASE awesome template=template0 encoding='unicode' lc_collate='th_TH.UTF8' lc_ctype='th_TH.UTF8'"
    sudo -u postgres psql -c "CREATE USER awesome WITH PASSWORD 'nopass';" awesome
    sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE awesome to awesome;" awesome


Fetch API
---

    curl -o src/main/resources/apiclient/helloworld.yaml http://localhost:2000/openapi.yaml


Check API Documents
---

    http://localhost:2000/swagger


Versioning Scheme
---

Versioning in URI should always be MAJOR version (eg,. v1) whereas implementation version consist of followings

v{major,start from 1}.{minor, start from 0}.{patch, start with 0}

    eg., v1.0.0

Description

* Major - Big changes, breaking backward compatibility, totally new API
* Minor - additional of subresource, additional of methods which DOES NOT break backward compatibility
* Patch - additional of fields which DOES NOT break backward compatibility
