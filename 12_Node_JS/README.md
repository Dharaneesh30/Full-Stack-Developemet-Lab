# 12. Node JS Lab Assignment

## 1. Title
Node JS Execution, Express File Streaming Server, and Advanced Menu-Based Resource Server.

## 2. Objective
To understand and implement Node.js execution, create an Express-based file server using the streaming data model, and develop a menu-based client-server system with modular architecture and request logging.

## 3. Problem Statement
*   **Part A**: Create and execute a simple Node.js program.
*   **Part B**: Create a file server with a streaming data model in Node.js and demonstrate its usage.
*   **Part C**: Develop a menu-based client/server system in Node.js with multiple modules to render various file types, utilizing a modular architecture (routes, controllers, services, utils), and implement a logging mechanism to track client requests.

## 4. Technologies Used
*   Node.js (Runtime Environment)
*   Express.js (Web Framework for HTTP server and routing)
*   HTML/CSS/JavaScript (Frontend UI)
*   Node core modules (`fs`, `path`, `crypto`)

## 5. Part A Explanation
Part A demonstrates the basic execution of a Node.js program. It uses `console.log` to print simple messages to the terminal, confirming that the Node.js runtime is installed and operational.

## 6. Part B Explanation
Part B implements an Express.js server that streams files to the client. Instead of loading the entire file into memory (which is inefficient for large files), it uses `fs.createReadStream()` to read the file in chunks and pipes it directly to the response object using `stream.pipe(res)`.

## 7. Part C Explanation
Part C builds an advanced Student Digital Resource Server. It provides a menu-driven web interface allowing students to view different types of media (Text, HTML, PDF, Image, Video) and download them. 

## 8. Use Case
**Student Digital Resource Server**: A centralized system where students can access academic materials (notes in text, structured web resources in HTML, assignments in PDF, diagrams in images, and lecture recordings in video).

## 9. Project Structure
```
12_Node_JS/
├── Part_A_Simple_Program/
│   └── hello.js
├── Part_B_File_Server/
│   ├── server.js
│   ├── package.json
│   ├── files/ (sample.txt, sample.html, README.md)
│   └── public/ (index.html)
└── Part_C_Menu_Based_Server/
    ├── server.js
    ├── package.json
    ├── routes/ (fileRoutes.js)
    ├── controllers/ (fileController.js)
    ├── services/ (fileService.js, logger.js)
    ├── utils/ (idGenerator.js)
    ├── public/ (index.html, style.css, script.js)
    ├── files/ (sample files for testing)
    └── logs/ (requests.log)
```

## 10. Installation Steps
1. Navigate to `Part_B_File_Server` and run `npm install`.
2. Navigate to `Part_C_Menu_Based_Server` and run `npm install`.

## 11. Execution Steps
*   **Part A**: Run `node Part_A_Simple_Program/hello.js`.
*   **Part B**: Navigate to `Part_B_File_Server` and run `npm start`. Access at `http://localhost:3000`.
*   **Part C**: Navigate to `Part_C_Menu_Based_Server` and run `npm start`. Access at `http://localhost:3001`.

## 12. API Endpoints (Part C)
*   `GET /api/file/view/:filename` - Streams the requested file for viewing.
*   `GET /api/file/download/:filename` - Initiates a file download.

## 13. Streaming Explanation
Node.js streams data chunk by chunk rather than loading the whole payload in memory. 
*   `fs.createReadStream(filepath)` creates a stream reading the source file.
*   `stream.pipe(res)` takes the read stream and outputs it continuously to the HTTP response, optimizing memory utilization on the server.

## 14. Modular Architecture Explanation
*   **server.js**: Entry point, configures Express.
*   **routes**: Defines the URL structures mapping to controllers.
*   **controllers**: Handles the HTTP request/response cycle, gathers parameters, calls services.
*   **services**: Contains the core business logic (file processing, logging).
*   **utils**: Contains helper functions like unique ID generation.

## 15. Logging Explanation
The application records every client request to `logs/requests.log`. Using `fs.appendFile`, it writes a log entry asynchronously containing the dynamically generated UUID (`crypto.randomUUID()`), date, time, requested file, and response status.

## 16. Expected Output
*   **Part A**: Console prints "Hello, World!"
*   **Part B**: Webpage showing downloadable/streamable files.
*   **Part C**: A styled menu allowing viewing of different media inside an iframe/video player and a prompt for downloading files.

## 17. Sample Log Output
```
ID: 7d8a8c7e-1b4f-4b55-8b1c-123456789abc | Date: 02/09/2026 | Time: 09:20:15 | File: sample.txt | Status: 200 SUCCESS
ID: 9ab23c11-4d8f-41de-b5b8-111111111111 | Date: 02/09/2026 | Time: 09:21:42 | File: unknown.pdf | Status: 404 FILE NOT FOUND
```

## 18. Result
The programs were executed successfully, demonstrating basic Node.js, Express.js file streaming, a modular application architecture, and a menu-driven UI.

## 19. Viva Questions and Answers
**Q1: What is the benefit of streaming in Node.js?**
A: Streaming handles large files efficiently by passing data chunk by chunk without loading the entire file into memory, reducing memory consumption.

**Q2: What is Express.js?**
A: Express is a minimal web application framework for Node.js that provides robust features for web and mobile applications, heavily used for routing and handling HTTP requests.

**Q3: How do we generate unique IDs in Node.js?**
A: We can use the built-in `crypto` module, specifically `crypto.randomUUID()`.

**Q4: Why separate routes, controllers, and services?**
A: It follows the principle of separation of concerns, making the code more readable, testable, maintainable, and scalable.
