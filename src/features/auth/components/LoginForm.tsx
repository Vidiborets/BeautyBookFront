"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { authStore } from "../stores/auth.stores";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/Button";

const LoginSchema = Yup.object({
  email: Yup.string().email("Некорректный email").required("Обязательное поле"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательное поле"),
});

export function LoginForm() {
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setStatus(null);
        try {
          await authStore.login(values.email, values.password);
          router.push("/home");
        } catch {
          setStatus("Неверный логин или пароль");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, values }) => (
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

          {status && <div className="text-sm text-red-500">{status}</div>}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Входим..." : "Войти"}
          </Button>

          <div className="text-center text-sm text-muted-foreground mt-3">
            <span>Нет аккаунта? </span>
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() =>
                router.push(
                  `/signup${
                    values.email
                      ? `?email=${encodeURIComponent(values.email)}`
                      : ""
                  }`,
                )
              }
            >
              Создать аккаунт
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
