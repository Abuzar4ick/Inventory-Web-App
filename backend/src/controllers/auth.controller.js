import { supabase } from "../lib/supabase.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Barcha ma'lumotar talab qilinadi" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (user)
      return res
        .status(400)
        .json({ message: "Foydalanuvchi nomi allaqachon mavjud" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { data: savedUser, error: insertError } = await supabase
      .from("users")
      .insert({ name, username, password: hashedPassword })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    generateToken(savedUser.id, res);
    res.status(201).json({
      id: savedUser.id,
      name: savedUser.name,
      username: savedUser.username,
    });
  } catch (error) {
    console.error(`Error in signup controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
