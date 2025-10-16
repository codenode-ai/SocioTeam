import { useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "wouter";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin, useCurrentUser } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z
    .string()
    .min(1, { message: "Username is required" })
    .max(64, { message: "Username is too long" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(128, { message: "Password is too long" }),
});

type LoginValues = z.infer<typeof loginSchema>;

function resolveNextPath(): string {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  const candidate = params.get("next");

  if (!candidate || !candidate.startsWith("/")) {
    return "/";
  }

  return candidate;
}

export default function Login() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user, isLoading } = useCurrentUser();
  const [, navigate] = useLocation();
  const nextPath = useMemo(() => resolveNextPath(), []);

  useEffect(() => {
    if (!isLoading && user) {
      navigate(nextPath);
    }
  }, [isLoading, user, navigate, nextPath]);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  const onSubmit = async (values: LoginValues) => {
    try {
      await loginMutation.mutateAsync(values);
      toast({
        title: t("auth.welcomeBack", { username: values.username }),
      });
      navigate(nextPath);
    } catch (error) {
      const description =
        error instanceof Error ? error.message : t("auth.unknownError");
      toast({
        variant: "destructive",
        title: t("auth.unknownError"),
        description,
      });
    }
  };

  return (
    <AuthLayout
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
      footer={
        <span>
          {t("auth.goToRegister")}{" "}
          <Link href="/register" className="font-medium text-primary">
            {t("auth.submitRegister")}
          </Link>
        </span>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.username")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="username"
                    placeholder="socioteam"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.password")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="current-password"
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? t("common.loading") : t("auth.submitLogin")}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
