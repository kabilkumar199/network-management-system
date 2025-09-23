import type React from "react"
import { Formik, Form } from "formik"
import { loginValidationSchema } from "@/lib/validationSchema"
import { FormBuilder } from "@/components/ui/FormBuilder"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Network } from "lucide-react"

export default function LoginPage() {

  const handleLogin = (values: { username: string; password: string }) => {
    const role = values.username.toLowerCase() === "admin" ? "admin" : "operator"
    localStorage.setItem("userRole", role)
    localStorage.setItem("username", values.username)
    window.location.href = "/dashboard"
  }

  const loginFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter 'admin' for admin access or 'user' for operator",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Network className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Network Management System</h1>
            <p className="text-muted-foreground mt-2">Sign in to manage your network infrastructure</p>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access the management console</CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <FormBuilder fields={loginFields} submitLabel="Sign In" isSubmitting={isSubmitting} />
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>Network Management System v2.1.0</p>
          <p className="mt-1">Secure enterprise network monitoring and management</p>
        </div>
      </div>
    </div>
  )
}


