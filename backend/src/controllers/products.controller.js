import { supabase } from "../lib/supabase.js";

export const createNewProduct = async (req, res) => {
  const { name, quantity, min_quantity } = req.body;

  try {
    if (!name || !quantity || !min_quantity) {
      return res
        .status(400)
        .json({ message: "Barcha ma'lumotar talab qilinadi" });
    }

    const { data: newProduct } = await supabase
      .from("products")
      .insert({ name, quantity, min_quantity })
      .select("id, name, quantity, min_quantity")
      .single();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(`Error in createNewProduct controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { data: products } = await supabase.from("products").select();
    res.status(200).json(products);
  } catch (error) {
    console.error(`Error in getAllProducts controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductById = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select()
      .eq("id", productId)
      .single();

    if (error || !product) {
      return res.status(404).json({ message: "Mahsulot topilmadi" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(`Error in getProductById controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProductById = async (req, res) => {
  const { id: productId } = req.params;
  const { name, quantity, min_quantity } = req.body;

  try {
    if (!name && !quantity && !min_quantity) {
      return res
        .status(400)
        .json({ message: "Kamida bitta maydon to'ldirilishi kerak" });
    }

    const { data: oldProduct, error: getError } = await supabase
      .from("products")
      .select()
      .eq("id", productId)
      .single();

    if (getError || !oldProduct) {
      return res.status(400).json({ message: "Mahsulot topilmadi" });
    }

    const { data: updatedProduct, error: updateError } = await supabase
      .from("products")
      .update({
        name: name ?? oldProduct.name,
        quantity: quantity ?? oldProduct.quantity,
        min_quantity: min_quantity ?? oldProduct.min_quantity,
      })
      .eq("id", productId)
      .select()
      .single();

    if (updateError) {
      return res.status(404).json({ message: "Mahsulot yangilanmadi" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(`Error in updateProductById controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProductById = async (req, res) => {
  const { id: productId } = req.params;

  try {
    const { data, error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      return res.status(400).json({ message: "O'chirishda xatolik yoki" });
    }

    res.status(200).json({ message: "Mahsulot muvaffaqiyatli o'chirildi", data });
  } catch (error) {
    console.error(`Error in deleteProductById controller: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};
