import { Field, ErrorMessage } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React from "react";

export interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  as?: React.ElementType;
  className?: string;
}

interface FormBuilderProps {
  fields: FormFieldConfig[];
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function FormBuilder({ fields, submitLabel = "Submit", isSubmitting }: FormBuilderProps) {
  return (
    <>
      {fields.map((field) => (
        <div className="space-y-2" key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Field
            as={field.as || Input}
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            className={field.className || "bg-input border-border"}
          />
          <ErrorMessage name={field.name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
      ))}
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </>
  );
}
