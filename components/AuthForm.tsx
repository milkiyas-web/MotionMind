"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { signupEmail, loginEmail } from "@/app/(auth)/actions"


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        password: z.string().min(4),
        email: z.string().email()
    })

}
const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                // Add form data to FormData
                const formData = new FormData();
                formData.append('name', values.name || '');
                formData.append('email', values.email);
                formData.append('password', values.password);

                const result = await signupEmail(null, formData);
                if ('error' in result) {
                    toast.error(result.error);
                } else {
                    toast.success("Account Created Successfully. Please signin");
                    router.push("/sign-in");
                }
            } else {
                const formData = new FormData();
                formData.append('email', values.email);
                formData.append('password', values.password);

                const result = await loginEmail(null, formData);
                if ('error' in result) {
                    toast.error(result.error);
                } else {
                    toast.success("Sign in Successfully.");
                    router.push('/');
                }
            }
        } catch (err) {
            console.log(err)
            toast.error(`There was an error: ${err}`)
        }
    }
    const isSignIn = type === "sign-in"
    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    {/* <Image src alt height={32}/> */}
                    <h2 className="text-primary-100">MotionMind</h2>
                </div>
                <h3>Create 2D motions with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full mt-4 form">
                        {!isSignIn && <FormField control={form.control} name="name" type="text" label="Name" placeholder="John Doe" />}
                        <FormField control={form.control} name="email" type="email" label="Email" placeholder="johndoe@gmail.com" />
                        <FormField control={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />

                        <Button type="submit" className="btn">{isSignIn ? "Sign in" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account already?"} <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1" >
                        {!isSignIn ? "Sign in" : "Sign up"}</Link>
                </p>
            </div>
        </div>

    )
}
export default AuthForm