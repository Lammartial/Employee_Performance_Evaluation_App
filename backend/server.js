import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],    // React URL
        methods: ["POST", "GET"],
        credentials: true
    }
));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_performance_evaluation_app" 
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "You are not authorized" })
    } else {
        jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
            if (err) {
                return res.json({Message: "Authentication error!"})
            } else {
                req.name = decoded.name;
                req.email = decoded.email;
                req.user_id = decoded.user_id
                next();
            }
        })
    }
}


app.get("/", verifyUser, (req, res) => {
    return res.json({Status: "Success", name:req.name, email: req.email, user_id: req.user_id})

})

const getUserIdFromToken = (token) => {
    // Implement your logic to decode the user ID from the JWT token here.
    // You'll need to use the same secret key that you used to sign the token.
    // You can use a library like 'jsonwebtoken' to decode the token.

    try {
        const decoded = jwt.verify(token, 'our-jsonwebtoken-secret-key');
        return decoded.user_id; // Assuming your JWT payload contains 'userId'
    } catch (error) {
        return null; // Return null or handle the error as needed
    }
};


// API endpoint to fetch the current user's avatar
app.get("/avatar", verifyUser, (req, res) => {
    // Use the user's ID to retrieve their avatar from the database
    const user_id = getUserIdFromToken(req.cookies.token); // You should implement getUserIdFromToken as mentioned earlier
    
    // Query the database to get the user's avatar based on userId
    const sql = "SELECT Avatar FROM users WHERE `User ID` = ?";
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Internal server error" });
        }

        if (result.length > 0) {
            // Send the avatar image data as a response
            res.contentType("image/jpeg"); // Adjust the content type based on your image format
            return res.send(result[0]["Avatar"]);
        } else {
            return res.status(404).json({ Message: "Avatar not found" });
        }
    });
});

// API endpoint to get all users with role = members
app.get("/members", (req, res) => {
    const sql = "SELECT `User ID`, `First Name`, `Last Name`, `Email`, `Position` FROM users WHERE `User Role` = 'Member'";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Internal server error" });
        }

        if (results.length > 0) {
            // Send the member data as a JSON response
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ Message: "No members found" });
        }
    });
});

app.get("/admins", (req, res) => {
    const sql = "SELECT `User ID`, `First Name`, `Last Name`, `Email`, `Position` FROM users WHERE `User Role` = 'Admin'";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Internal server error" });
        }

        if (results.length > 0) {
            // Send the member data as a JSON response
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ Message: "No admins found" });
        }
    });
});

app.get("/hrs", (req, res) => {
    const sql = "SELECT `User ID`, `First Name`, `Last Name`, `Email`, `Position` FROM users WHERE `User Role` = 'HR'";
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Internal server error" });
        }

        if (results.length > 0) {
            // Send the member data as a JSON response
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ Message: "No HRs found" });
        }
    });
});

// Endpoint to retrieve avatars
app.get("/avatar/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT Avatar FROM users WHERE `User ID` = ?";
    db.query(sql, [userId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
      } else if (result.length > 0) {
        res.contentType("image/jpeg"); // Adjust the content type based on your image format
        res.send(result[0]["Avatar"]);
      } else {
        res.status(404).json({ message: "Avatar not found" });
      }
    });
  });

// Retrieve information of a particular user
  app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM users WHERE `User ID` = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ Message: "Internal server error" });
        }

        if (results.length > 0) {
            // Send the member data as a JSON response
            return res.status(200).json(results);
        } else {
            return res.status(404).json({ Message: "No members found" });
        }
    });
  });


app.post("/users", (req, res) => {
    const sql = "SELECT * from users WHERE email = ? AND password = ? AND `User Role` = ?";
    db.query(sql, [req.body.email, req.body.password, req.body[`User Role`]], (err, data) => {
        if (err) return res.json({Message: "Error!"});
        if (data.length > 0) {
            const name = data[0]["First Name"] + " " + data[0]["Last Name"];
            const email = data[0]["Email"];
            const user_id = data[0]["User ID"]
            const token = jwt.sign({name, email, user_id}, "our-jsonwebtoken-secret-key", {expiresIn: '1d'});
            res.cookie('token', token)
            return res.json({Status: "Success"})
        } else {
            return res.json({Message: "Invalid credentials or role!" });
        }
    })
})

app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"})
})


app.listen(5000, () => {
    console.log('listening')
})