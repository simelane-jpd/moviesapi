module.exports = function (app, db) {
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


	const saltRounds = 10;
    async function getUserByUsername(username) {
		return await db.oneOrNone(`SELECT * from users WHERE username = $1`, [username]);
	}
    function verifyToken(req, res, next) {
		const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
		if (!req.headers.authorization || !token) {
			res.sendStatus(401);
			return;
		}
		try {
			const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
			const { username } = decoded;

			if (username) {
				next();
			} else {
				res.status(403).json({
					message: 'unauthorized'
				});
			}
		} catch (err) {
			if (err && 500) {
				res.json({
					message: 'expired'
				})
			}
			next()


		}

	}
    
    //app.get("users/register",  (req, res) => {
       // res.render("register");
   //});
   
   
    // app.get("users/login",  (req, res) => {
       // flash sets a messages variable. passport sets the error message
       //console.log(req.session.flash.error);
       //res.render("login");
    // });
     
    // app.get("/users/home", (req, res) => {
       //console.log(req.isAuthenticated());
      // res.render("home", { user:req.user.name });
    // });
     //app.get("/users/logout", (req, res) => {
       //req.logout();
     //res.render("index", { message: "You have logged out successfully" });
//app.post("users/register",  async (req, res) => {
    //let { firstname, lastname, username, password } = req.body;
  
   // let errors = [];
  
   // console.log({
    //    firstname,
    //    lastname,
    //  username,
      
    //  password,
      
   // });
    //if (!firstname || !lastname || !username || !password) {
    //    errors.push({ message: "Please enter all fields" });
    //  }
    
     // if (password.length < 6) {
     //   errors.push({ message: "Password must be a least 6 characters long" });
     // }
    
      //if (password !== password2) {
       // errors.push({ message: "Passwords do not match" });
      //}
    
     // if (errors.length > 0) {
     //   res.render("register", { errors, firstname, lastname, username, password });
     // } else {
      //  hashedPassword = await bcrypt.hash(password, 10);
      //  console.log(hashedPassword);
        // Validation passed
      //    `SELECT * FROM users
       //     WHERE username = $1`,
       //   [username],
        //  (err, results) => {
        //    if (err) {
         //     throw err;
         //   }
          //  console.log(results.rows);
    
          //  if (results.rows.length > 0) {
           //  errors.push({message: "username already registered" });
           //  res.render("register", {errors });
                
            
          //  } else {
           //   pool.query(
               
              //  [firstname, lastname, hashedPassword],
              //  (err, results) => {
               //   if (err) {
                   // throw err;
                //  }
              //    console.log(results.rows);
                 // req.flash("success_msg", "You are now registered. Please log in");
                //  res.redirect("users/login");
               // }
             // );
           // }
         // }
        //);
    //  }
//});

app.post('/users/register', verifyToken, async function (req, res, next) {
    const { firstname } = req.body;
    const { lastname } = req.body;
    const { username } = req.body;
    const { password } = req.body;
    //let loveCounter = 0

    let checkDuplicate = await db.manyOrNone(`SELECT id from users WHERE username = $1`, [username]);
    bcrypt.genSalt(saltRounds, async function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
            // Store hash in your password DB.
            if (checkDuplicate.length < 1) {
                await db.none(`insert into users (firstname, lastname, username, password) values ($1, $2, $3)`, [firstname, lastname, username, hash, ])
                res.json({
                    message: 'success'
                });
            } else {
                res.json({
                    message: 'duplicate'
                });
            }
        });
    });

})

app.post('/users/login',verifyToken, async function (req, res, next) {
    const { username } = req.body;
    const { password } = req.body;
    const token = jwt.sign({
        username
    }, process.env.ACCESS_TOKEN_SECRET);
    let checkUser = await db.manyOrNone(`SELECT id from users WHERE username = $1`, [username]);
    if (checkUser.length < 1) {
        res.json({
            token,
            message: 'username not registered'
        });
    } else {

        let checkPassword = await db.oneOrNone(`SELECT password from users WHERE username = $1`, [username]);

        const match = await bcrypt.compare(password, checkPassword.password);

        if (match) {
            res.json({
                token,
                message: 'correct password'
            });
        } else {
            res.json({
                token,
                message: 'incorrect password'
            
            })
        
        }
    }

});
}
