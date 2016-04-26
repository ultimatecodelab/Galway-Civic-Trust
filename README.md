## Walking Tours System for the Galway Civic Trust using MEAN stack and Ionic Framework

#### Developer :   Arjun Kharel, Trevor Davies, and Patryk Piecha
#### Galway - Mayo Institute of Technology
#### Course : Software Development(Honours)
#### Module : Applied Project and minor dissertation - Final Year Project

##System Architecture

![Alt text](https://github.com/ultimatecodelab/Galway-Civic-Trust/blob/master/architectureDiagram.PNG "Optional title")

##Overview
This project has been done in conjunction with the Galway Civic
Trust. The purpose of the project was to solve the problem the Galway
Civic Trust had. The main problem they had was that they had no facility
by which the trust could create, read, update and delete walking tours with
out the need to have a separate mobile application developed for each tour.
The system comprises of two main parts a back end web application(Admin
Panel) which its self consists of two parts an administration site and an
API(Application Programming Interface). The API is protected using jwt
and is safe from external injection/attacks. The Admin Panel which is what
the trust will use to manage the walking tour’s content, has been developed
using a MEAN(MongoDB, Express, Angular JS, Node JS) stack approach.
The API is used by both the Admin panel and the mobile application to
communicate with the database. The second part of the project was to
develop a cross platform mobile application that consumes the data from
the database, which is provided by the API. The mobile application makes
extensive use of Google’s Map API for both dynamic and static maps used
within the mobile application. The mobile application was developed using
the Ionic Framework and Angular JS.

**Authors** This project has been developed by 3 fourth year students: Arjun
Kharel(myself), Trevor Davies and Patryk Piecha for the Bachelors of Science
Honours Degree in Software Development. Arjun was responsible for the development
of the back-end(Admin Portal) web application and also the API
for mobile devices to consume the data from. Patryk, Trevor, Arjun were
responsible for the mobile application and every one of us contributed in the
documentation.

##Technologies
####MEAN stack  (MongoDb/ ExpressJs/ Node.js / Angularjs)
####Ioinic Framework
####JWT Authencation
####Send Grid

##Project Resources:
**Admin Panel (Back-end / API )** : https://github.com/ultimatecodelab/Galway-Civic-Trust

**Ionic mobile application that consume data from an API::** https://github.com/TrevorDavies/Galway-Civic-Trust

**Detailed documentation about the project is at:**: https://github.com/Paddero/GCT-Documentation

**Please have a look at the project documentation**.

It contains everything about the project including:

* Introduction
* Methodology
* Technology Review
* System Design,Implementation and Deployment
* System Evaluation  and Conclusion. 

##Deployment:
**Admin Portal (Backend) is hosted on Digital ocean and is live at :** http://galwaytour.tk/

**APK for mobile app is provide at** : https://github.com/TrevorDavies/Galway-Civic-Trust 
 
*This is only for testing purpose. The final system will be deployed on a prefered hosting provider of Galway Civic Trust for production.*

