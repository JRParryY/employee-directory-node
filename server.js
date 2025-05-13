const http = require('http');
const fs = require('fs');
const path = require('path');
const { MongoClient, ObjectId } = require('mongodb');

const PORT = 5202;
const mongoURI = 'mongodb+srv://jparr4:jparr4@cluster1.lqo9sxo.mongodb.net/employee_directory?retryWrites=true&w=majority&appName=Cluster1';

// CORS headers
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
};

// Helper function to parse JSON body
const getRequestBody = (req) => {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
    });
};

// Helper function to send JSON response
const sendJsonResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify(data));
};

// Create MongoDB client
const client = new MongoClient(mongoURI);

const server = http.createServer(async (req, res) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204, corsHeaders);
        res.end();
        return;
    }

    // Handle /employees route specifically
    if (req.url === '/employees' || req.url === '/employees/') {
        fs.readFile(path.join(__dirname, 'public', 'employees', 'index.html'), (err, content) => {
            if (err) {
                console.error('Error reading employees/index.html:', err);
                sendJsonResponse(res, 500, { message: 'Error loading employee directory' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
        return;
    }

    const baseUrl = '/api/employees';

    // Simple /api route to show all employees
    if (req.method === 'GET' && req.url === '/api') {
        try {
            await client.connect();
            const db = client.db('employee_directory');
            const collection = db.collection('employees');
            const employees = await collection.find({}).toArray();
            sendJsonResponse(res, 200, {
                message: 'Employee Directory API',
                total_employees: employees.length,
                employees: employees
            });
            return;
        } catch (error) {
            console.error('Error:', error);
            sendJsonResponse(res, 500, { message: 'Internal server error' });
            return;
        }
    }

    // API Routes
    if (req.url.startsWith(baseUrl)) {
        try {
            await client.connect();
            const db = client.db('employee_directory');
            const collection = db.collection('employees');

            // GET all employees
            if (req.method === 'GET' && req.url === baseUrl) {
                const employees = await collection.find({}).toArray();
                sendJsonResponse(res, 200, employees);
            }
            // GET single employee
            else if (req.method === 'GET' && req.url.startsWith(`${baseUrl}/`)) {
                const id = req.url.split('/')[3];
                const employee = await collection.findOne({ _id: new ObjectId(id) });
                if (employee) {
                    sendJsonResponse(res, 200, employee);
                } else {
                    sendJsonResponse(res, 404, { message: 'Employee not found' });
                }
            }
            // POST new employee
            else if (req.method === 'POST' && req.url === baseUrl) {
                const body = await getRequestBody(req);
                const result = await collection.insertOne(body);
                sendJsonResponse(res, 201, { _id: result.insertedId, ...body });
            }
            // PUT update employee
            else if (req.method === 'PUT' && req.url.startsWith(`${baseUrl}/`)) {
                const id = req.url.split('/')[3];
                const body = await getRequestBody(req);
                const result = await collection.updateOne(
                    { _id: new ObjectId(id) },
                    { $set: body }
                );
                if (result.matchedCount) {
                    sendJsonResponse(res, 200, { _id: id, ...body });
                } else {
                    sendJsonResponse(res, 404, { message: 'Employee not found' });
                }
            }
            // DELETE employee
            else if (req.method === 'DELETE' && req.url.startsWith(`${baseUrl}/`)) {
                const id = req.url.split('/')[3];
                const result = await collection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount) {
                    sendJsonResponse(res, 200, { message: 'Employee deleted' });
                } else {
                    sendJsonResponse(res, 404, { message: 'Employee not found' });
                }
            }
        } catch (error) {
            console.error('Error:', error);
            sendJsonResponse(res, 500, { message: 'Internal server error' });
        }
    }
    // Serve static files
    else {
        let filePath = req.url === '/' ? '/index.html' : req.url;
        filePath = path.join(__dirname, 'public', filePath);

        // Get file extension
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        }[ext] || 'text/plain';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // For SPA, redirect all non-file requests to index.html
                    if (req.url.startsWith('/employees')) {
                        fs.readFile(path.join(__dirname, 'public', 'employees', 'index.html'), (err, content) => {
                            if (err) {
                                sendJsonResponse(res, 500, { message: 'Error loading employee directory' });
                            } else {
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(content);
                            }
                        });
                    } else {
                        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
                            if (err) {
                                sendJsonResponse(res, 500, { message: 'Error loading index.html' });
                            } else {
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(content);
                            }
                        });
                    }
                } else {
                    sendJsonResponse(res, 500, { message: 'Server error' });
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 