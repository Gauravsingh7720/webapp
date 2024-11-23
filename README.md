
# **Webapp**

### **Description**
This project provides a comprehensive guide to deploying a simple web application on AWS EC2 using GitHub, Node.js, and CodeDeploy. The guide includes setting up an EC2 instance, cloning a GitHub repository, installing necessary dependencies, configuring the CodeDeploy agent, and deploying an Express.js application. It also covers creating deployment scripts, setting up AWS CodeBuild for continuous integration, and automating the deployment process.

### **Tags**
- AWS EC2
- GitHub
- CodeDeploy
- Node.js
- Express.js
- Continuous Integration
- Deployment Scripts
- Web Application

### **Steps for Deployment**

1. **SSH into the EC2 Instance**
   ```bash
   cd Downloads
   chmod 400 webapp.pem
   ssh -i "webapp.pem" ec2-user@ec2-184-72-68-27.compute-1.amazonaws.com
   ```

2. **Clone the GitHub Repository**
   ```bash
   git clone https://github.com/Gauravsingh7720/webapp.git
   cd webapp
   ```

3. **Install Git and Configure User Details**
   ```bash
   sudo yum install git -y
   git config --global user.name "Gaurav"
   git config --global user.email "grv.rajpur@gmail.com"
   ```

4. **Update EC2 Instance and Install Required Packages**
   ```bash
   sudo yum update -y
   sudo yum install ruby -y
   sudo yum install wget -y
   ```

5. **Install CodeDeploy Agent**
   ```bash
   cd /home/ec2-user
   sudo wget https://aws-codedeploy-us-east-2.s3.us-east-2.amazonaws.com/latest/install
   sudo chmod +x ./install
   sudo ./install auto
   sudo service codedeploy-agent start
   sudo service codedeploy-agent status
   ```

6. **Set Up the Node.js Application**
   - Initialize the Node.js project and install **Express**:
     ```bash
     npm init -y
     npm install express
     ```

   - Create the application file (`app.js`):
     ```bash
     touch app.js
     sudo nano app.js
     ```

   - Sample `app.js`:
     ```javascript
     const express = require('express');
     const app = express();

     app.get('/', (req, res) => {
       res.send('Hello World from EC2!');
     });

     const port = process.env.PORT || 3000;
     app.listen(port, () => {
       console.log(`Server running on port ${port}`);
     });
     ```

7. **Access the Application**
   - Open the following in your browser (replace with the actual instance public IP):
     ```
     http://184.72.68.27:3000/
     ```

8. **Set Up Deployment Scripts**
   - Create and edit the `appspec.yml` file:
     ```bash
     sudo touch appspec.yml
     sudo nano appspec.yml
     ```

   - Create the `install_dependencies.sh` script:
     ```bash
     sudo touch install_dependencies.sh
     sudo nano install_dependencies.sh
     ```

   - Create the `start_server.sh` script:
     ```bash
     sudo touch start_server.sh
     sudo nano start_server.sh
     ```

   - Add the changes to Git and push them:
     ```bash
     git add .
     git commit -m "Added appspec.yml and deployment scripts"
     git push origin main
     ```

9. **Set Up CodeBuild for Continuous Integration**
   - Create and edit the `buildspec.yml` file:
     ```bash
     sudo touch buildspec.yml
     sudo nano buildspec.yml
     ```

   - **`buildspec.yml`** for building the Node.js application and pushing the artifact to S3:
     ```yaml
     version: 0.2
     phases:
       install:
         commands:
           - echo Installing dependencies...
           - npm install
       build:
         commands:
           - echo Building the application...
           - zip -r webapp.zip .
       post_build:
         commands:
           - echo Uploading artifact to S3...
           - aws s3 cp webapp.zip s3://your-s3-bucket-name/webapp.zip
     artifacts:
       files:
         - webapp.zip
     ```

   - After creating the `buildspec.yml`, push it to the GitHub repository.

10. **Set Up CodeDeploy for Deployment**
    - Create a **CodeDeploy Application** and **Deployment Group** in the AWS Management Console.
    - Configure CodeDeploy to pull the artifact from the S3 bucket (uploaded by CodeBuild).
    - **Deploy the Artifact** using the CodeDeploy agent, which will copy the files from the S3 bucket and deploy them to the EC2 instance.

11. **Triggering the CI/CD Pipeline**
    - Whenever changes are pushed to the GitHub repository, AWS CodeBuild will automatically start the build process.
    - Once the build is completed, CodeBuild will upload the artifact to S3, and CodeDeploy will automatically pick it up to deploy the new version of the application to the EC2 instance.

12. **Access the Application Again**
    - After the deployment process is complete, visit the EC2 instance public IP again to verify the deployment:
      ```
      http://184.72.68.27:3000/
      ```
