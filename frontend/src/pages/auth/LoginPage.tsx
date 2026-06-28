import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/shared/ui/Card";
import { Brand } from "@/shared/ui/Brand";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Typography } from "@/shared/ui/Typography";

import {
    loginSchema,
    type LoginSchema,
} from "@/features/auth/schemas/login.schema";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { useAuth } from "@/shared/auth";

export function LoginPage() {

    const navigate = useNavigate();

    const loginMutation = useLogin();

    const { login } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginSchema) => {
        try {
            console.log("1. submit");

            const response = await loginMutation.mutateAsync(data);

            console.log("2. response", response);

            login(response.user);

            console.log("3. after login");

            navigate("/admin");

            console.log("4. after navigate");
        } catch (error) {
            console.error("LOGIN ERROR", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-6">
            <Card className="w-full max-w-md">
                <Card.Content className="space-y-8">

                    <div className="flex flex-col items-center gap-4">

                        <Brand />

                        <div className="text-center">

                            <Typography
                                variant="h2"
                                weight="bold"
                            >
                                Добро пожаловать
                            </Typography>

                            <Typography
                                variant="body"
                                color="secondary"
                            >
                                Введите логин и пароль,
                                чтобы продолжить работу
                            </Typography>

                        </div>

                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <Input
                            label="Логин"
                            placeholder="Введите логин"
                            error={errors.login?.message}
                            {...register("login")}
                        />

                        <Input
                            label="Пароль"
                            type="password"
                            placeholder="Введите пароль"
                            error={errors.password?.message}
                            {...register("password")}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={
                                loginMutation.isPending
                            }
                        >
                            Войти
                        </Button>

                    </form>

                    {loginMutation.isError && (
                        <Typography
                            variant="caption"
                            color="danger"
                            align="center"
                        >
                            Неверный логин или пароль
                        </Typography>
                    )}

                </Card.Content>
            </Card>
        </div>
    );
}