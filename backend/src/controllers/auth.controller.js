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

    const { data: existingUser } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (existingUser)
      return res
        .status(400)
        .json({ message: "Foydalanuvchi nomi allaqachon mavjud" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: savedUser, error: insertError } = await supabase
      .from("users")
      .insert({ name, username, password: hashedPassword })
      .select("id, name, username")
      .single();

    if (insertError) throw insertError;

    generateToken(savedUser.id, res);
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(`Error in signup controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Barcha ma'lumotar talab qilinadi" });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: "Hisob maʼlumotlari yaroqsiz" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Hisob maʼlumotlari yaroqsiz" });

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      name: user.name,
      username: user.username,
    });
  } catch (error) {
    console.error("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
