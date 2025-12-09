"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authStore } from "../stores/auth.stores";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/Button";

const SignUpSchema = Yup.object({
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  phoneNumber: Yup.string().optional(),
});

export function SignUpForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
      }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(null);
        try {
          await authStore.register(values);
          router.push("/home");
        } catch (e) {
          setStatus("Ошибка регистрации");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Field
              name="email"
              type="email"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Пароль</label>
            <Field
              name="password"
              type="password"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-xs text-red-500 mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1">Имя</label>
              <Field
                name="firstName"
                className="w-full rounded-lg border border-input px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Фамилия</label>
              <Field
                name="lastName"
                className="w-full rounded-lg border border-input px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm mb-1">Телефон</label>
            <Field
              name="phoneNumber"
              className="w-full rounded-lg border border-input px-3 py-2 text-sm"
            />
          </div>

          {status && <div className="text-sm text-red-500">{status}</div>}

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Создаём..." : "Зарегистрироваться"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
