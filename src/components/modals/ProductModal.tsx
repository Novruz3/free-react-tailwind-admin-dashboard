import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { IProduct } from "../../types/IProduct";
import TextArea from "../form/input/TextArea";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  product: IProduct | null;
  onSave: (product: IProduct) => void;
};

const emptyProduct = (): IProduct => ({
  id: 0,
  name: "",
  variants: "",
  category: "",
  price: "",
  image: "",
  status: "Pending",
});

const ProductModal: React.FC<Props> = ({ isOpen, closeModal, product, onSave }) => {
  const [form, setForm] = useState<IProduct>(emptyProduct());

  useEffect(() => {
    // initialize form when modal opens or product changes
    if (product) {
      setForm(product);
    } else {
      setForm(emptyProduct());
    }
  }, [product, isOpen]);

  function handleChange<K extends keyof IProduct>(key: K, value: IProduct[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    // Simple validation: require name
    if (!form.name.trim()) {
      // you can swap to a nicer UI validation
      alert("Product name is required");
      return;
    }
    onSave(form);
    closeModal();
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {product ? "Edit Product" : "Add Product"}
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            {product
              ? "Update product details and save changes."
              : "Add a new product to your inventory."}
          </p>
        </div>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="custom-scrollbar h-[420px] overflow-y-auto px-2 pb-3">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Name TM</Label>
                <Input
                  type="text"
                  value={form.name_tm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Name RU</Label>
                <Input
                  type="text"
                  value={form.name_ru}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                />
              </div>

              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>

              <div>
                <Label>Old Price</Label>
                <Input
                  type="number"
                  value={form.old_price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>


              <div>
                <Label>Description TM</Label>
                <TextArea
                  type="text"
                  value={form.variants}
                  rows={6}
                />
              </div>

              <div>
                <Label>Description RU</Label>
                <TextArea
                  type="text"
                  value={form.variants}
                  rows={6}
                />
              </div>

              <div>
                <Label>Image URL</Label>
                <Input
                  type="text"
                  value={form.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                />
              </div>

              <div>
                <Label>Status</Label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value as IProduct["status"])
                  }
                  className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800"
                >
                  <option value="Delivered">Delivered</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>

              <div className="col-span-1 lg:col-span-2">
                <Label>Description (optional)</Label>
                <Input
                  type="text"
                  value={(form as any).description ?? ""}
                  onChange={(e) =>
                    // keep any extra fields without strict typing break
                    setForm((s) => ({ ...s, ...( { description: e.target.value } as any) }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal} type="button">
              Close
            </Button>
            <Button size="sm" onClick={handleSubmit} type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ProductModal;
