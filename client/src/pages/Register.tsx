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
import { useRegister, useCurrentUser } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

type RegisterValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

function resolveNextPath(): string {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const params = new URLSearchParams(search);
  const candidate = params.get("next");

  if (!candidate || !candidate.startsWith("/")) {
    return "/";
  }

  return candidate;
}

export default function Register() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { user, isLoading } = useCurrentUser();
  const [, navigate] = useLocation();
  const nextPath = useMemo(() => resolveNextPath(), []);

  const passwordMismatchMessage = t("auth.passwordMismatch");

  const registerSchema = useMemo(
    () =>
      z
        .object({
          username: z
            .string()
            .min(1, { message: "Username is required" })
            .max(64, { message: "Username is too long" }),
          password: z
            .string()
            .min(6, { message: "Password must be at least 6 characters" })
            .max(128, { message: "Password is too long" }),
          confirmPassword: z
            .string()
            .min(6, { message: "Please confirm your password" })
            .max(128, { message: "Password is too long" }),
        })
        .superRefine((values, ctx) => {
          if (values.password !== values.confirmPassword) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              path: ["confirmPassword"],
              message: passwordMismatchMessage,
            });
          }
        }),
    [passwordMismatchMessage],
  );

  useEffect(() => {
    if (!isLoading && user) {
      navigate(nextPath);
    }
  }, [isLoading, user, navigate, nextPath]);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const registerMutation = useRegister();

  const onSubmit = async ({ username, password }: RegisterValues) => {
    try {
      await registerMutation.mutateAsync({ username, password });
      toast({
        title: t("auth.accountCreated"),
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
      title={t("auth.registerTitle")}
      subtitle={t("auth.registerSubtitle")}
      footer={
        <span>
          {t("auth.goToLogin")}{" "}
          <Link href="/login" className="font-medium text-primary">
            {t("auth.submitLogin")}
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
                    autoComplete="new-password"
                    placeholder="********"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("auth.confirmPassword")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    autoComplete="new-password"
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
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? t("common.loading")
              : t("auth.submitRegister")}
          </Button>
        </form>
      </Form>
    </AuthLayout>
  );
}
