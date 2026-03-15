import  jwt  from 'jsonwebtoken';
import sql from '../configs/db.js'
import bcrypt from "bcryptjs"


export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!email || !name || !password) {
           return res.json({ success: false, message: "Missing details" })
        }

        const findemail = await sql`SELECT * FROM users WHERE email = ${email}`

        if (findemail.length > 0) {
          return  res.json({ success: false, message: "user is already exist" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

      const user =  await sql`INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashPassword})
    RETURNING *`

    
    // create token
    const token = jwt.sign(
      { id: user[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

        res.json({
      success: true,
      user: {
        id: user[0].id,
        name: user[0].name,
        email: user[0].email
      }
    });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}