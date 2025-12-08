import jwt from "jsonwebtoken";
import { supabase } from "../lib/supabase.js";
import { ENV } from "../lib/env.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid token" });

    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, username")
      .eq("id", decoded.userId)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ message: "Database error" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.error(`Error in protectRoute middleware: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
