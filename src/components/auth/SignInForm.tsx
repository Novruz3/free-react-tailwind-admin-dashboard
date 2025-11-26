import { useState } from "react";
import { EyeCloseIcon, EyeIcon } from "../../assets/icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../api/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

interface FormikValues {
  phone_number: string;
  password: string;
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: FormikValues) =>
      axiosInstance.post("/admins/login", data),
  });

  const formik = useFormik<FormikValues>({
    initialValues: {
      phone_number: "+993",
      password: "",
    },
    validationSchema: Yup.object({
      phone_number: Yup.string()
        .matches(
          /^\+993(61|62|63|64|65|71)\d{6}$/,
          "Phone must be +993 and start with 61, 62, 63, 64, 65 or 71"
        )
        .required("Required field"),
      password: Yup.string()
        .min(3, "Password must be at least 3 characters")
        .required("Required field"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res: any = await mutation.mutateAsync(values);
        if (res.data.access_token) {
          const expiresAt = Date.now() + 24 * 1000 * 60 * 60;
          sessionStorage.setItem(
            "authUser",
            JSON.stringify({
              access_token: res.data.access_token,
              full_name: res.data.admin.full_name,
              expiresAt,
            })
          );
          toast.success("Logged in successfully");
          navigate("/");
          window.location.reload();
          resetForm();
        }
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message || "Login failed");
        }
      }
    },
  });

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your phone number and password to sign in!
            </p>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label>
                  Phone Number <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="phone_number"
                  onChange={formik.handleChange}
                  value={formik.values.phone_number}
                  className={
                    formik.touched.phone_number && formik.errors.phone_number
                      ? "border-red-500"
                      : ""
                  }
                />
                {formik.touched.phone_number && formik.errors.phone_number && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.phone_number}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  Password <span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "border-red-500"
                        : ""
                    }
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                    )}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div>
                <Button
                  className="w-full"
                  size="md"
                  type="submit"
                  disabled={!formik.isValid || mutation.isPending}
                >
                  {mutation.isPending ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
