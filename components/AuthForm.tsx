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


const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        password: z.string().min(4),
        email: z.string().email()
    })

}
const AuthForm = ({ type }: { type: FormType }) => {
    const formSchema = authFormSchema(type)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-up") {
                console.log("SIGN UP", values)
            } else {
                console.log("SIGN IN", values)
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
                        {!isSignIn && <p>Name</p>}
                        <p>Email</p>
                        <p>Password</p>

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