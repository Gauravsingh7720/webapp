# **Webapp**

### **Description**
This project provides a comprehensive guide to deploying a simple web application on AWS EC2 using GitHub, Node.js, and CodeDeploy. The guide includes setting up an EC2 instance, cloning a GitHub repository, installing necessary dependencies, configuring the CodeDeploy agent, and deploying an Express.js application. It also covers creating deployment scripts and setting up AWS CodeBuild for continuous integration to automate the deployment process.

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
   git clone https://github.com/atulkamble/webapp
   cd webapp
   ```

3. **Install Git and Configure User Details**
   ```bash
   sudo yum install git -y
   git config --global user.name "Atul Kamble"
   git config --global user.email "atul_kamble@hotmail.com"
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

9. **Set Up CodeBuild (Optional for CI/CD)**
   - Create and edit the `buildspec.yml` file:
     ```bash
     sudo touch buildspec.yml
     sudo nano buildspec.yml
     ```

---

This `README.md` outlines all the key steps for deploying the web application using AWS services and GitHub. Let me know if any updates are needed!
