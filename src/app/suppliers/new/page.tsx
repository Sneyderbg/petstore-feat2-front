"use client";

import { Info } from "@/components/common/Info";
import { FieldConfigs, PartialForm } from "@/components/common/PartialForm";
import { NewProduct } from "@/components/suppliers/NewProduct";
import { ProductCard } from "@/components/suppliers/ProductCard";
import { StepScreen } from "@/components/suppliers/StepScreen";
import { Summary } from "@/components/suppliers/Summary";
import { Button } from "@/components/ui/button";
import { createDefaultValues, createSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { ClassNameValue } from "tailwind-merge";

export default function NewSupplier() {
  const [step, setStep] = useState(1);
  const [showProductForm, setShowProductForm] = useState(false);
  const allFields = {
    ...generalInfoFields,
    ...contactInfo,
    ...paymentConditions,
  };

  const form = useForm({
    defaultValues: {
      ...createDefaultValues(allFields),
      products: [],
    },
    resolver: zodResolver(createSchema(allFields)),
    mode: "onChange",
  });

  const { append } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const nextStep = () => setStep((s) => s + 1);

  const innerDivCn: ClassNameValue =
    "grid grid-cols-2 justify-around items-center px-4 gap-16 w-full";

  return (
    <FormProvider {...form}>
      <div className="flex flex-col w-full h-full p-12 overflow-x-hidden">
        <StepScreen show={step == 1}>
          <Info
            title="Agregar proveedor"
            desc="Por favor, completa la información necesaria para registrar un nuevo proveedor."
          />

          <PartialForm
            leftInfo={
              <Info
                title="Paso 1 - Datos Generales"
                desc="Ingrese los datos generales del proveedor."
              />
            }
            onAction={nextStep}
            fields={generalInfoFields}
          />
        </StepScreen>

        <StepScreen show={step == 2}>
          <Info
            title="Paso 2 – Productos Asociados"
            desc="¿Qué productos ofrece este proveedor?"
          >
            <Button variant={"outline"}>Eliminar Producto</Button>
            <Button onClick={() => setShowProductForm(true)}>
              Agregar Producto
            </Button>
          </Info>
          <div className={innerDivCn}>
            <Info title="Lista de Productos">
              <Button onClick={() => nextStep()}>Siguiente</Button>
              <Button>Guardar Productos</Button>
            </Info>
            <div className="flex flex-wrap gap-4">
              <ProductCard
                info={{
                  name: "Croquetas Premium DogFood",
                  brand: "DogFood Brand",
                  price: 25,
                  inStock: true,
                }}
              />
              <ProductCard
                info={{
                  name: "Plush Cat Toy",
                  brand: "CatToys Inc.",
                  price: 15,
                  inStock: true,
                }}
              />
            </div>
          </div>
          <NewProduct
            open={showProductForm}
            onOpenChange={setShowProductForm}
            onSubmit={(data) => {
              append(data);
              setShowProductForm(false);
            }}
            onCancel={() => setShowProductForm(false)}
          />
        </StepScreen>

        <StepScreen show={step == 3}>
          <Info
            title="Paso 3 – Información de Contacto"
            desc="Proporcione la información de contacto del proveedor."
          />
          <PartialForm
            leftInfo={<Info title="Contacto" />}
            onAction={nextStep}
            fields={contactInfo}
          />
        </StepScreen>

        <StepScreen show={step == 4}>
          <Info
            title="Paso 4 – Condiciones de Pago"
            desc="Defina las condiciones de pago con el proveedor."
          />
          <PartialForm
            leftInfo={<Info title="Condiciones de Pago" />}
            onAction={nextStep}
            fields={paymentConditions}
          />
        </StepScreen>

        <StepScreen show={step == 5}>
          <Info
            title="Resumen de Proveedor"
            desc="Revise toda la información ingresada antes de finalizar."
          >
            <Button variant={"outline"} onClick={() => setStep(1)}>
              Volver a Revisar
            </Button>
            <Button onClick={() => console.log(form.getValues())}>
              Finalizar
            </Button>
          </Info>
          <div className={innerDivCn}>
            <Info title="Revisión Final" />
            <Summary info={form.getValues()} />
          </div>
        </StepScreen>
      </div>
    </FormProvider>
  );
}

const generalInfoFields: FieldConfigs = {
  name: {
    label: "Nombre",
    placeholder: "Ingrese el nombre del proveedor",
  },
  descrition: {
    label: "Descripción",
    placeholder: "Ingrese una breve descripción",
  },
  category: {
    label: "Categoría",
    hint: "Ej. Alimentos, Juguetes, etc.",
    placeholder: "Ingrese la categoría",
  },
  deliveryTime: {
    label: "Tiempo de Entrega",
    placeholder: "Ingrese el tiempo de entrega (días)",
  },
};

const contactInfo: FieldConfigs = {
  phone: {
    label: "Teléfono",
    placeholder: "Ingrese el número de teléfono",
  },
  email: {
    label: "Email",
    placeholder: "Ingrese el correo electrónico",
  },
  socials: {
    label: "Redes Sociales",
    placeholder: "Enlace a las redes sociales",
  },
  address: {
    label: "Dirección Física",
    placeholder: "Ingrese la dirección completa",
  },
};

const paymentConditions: FieldConfigs = {
  paymentDeadline: {
    label: "Plazo de Pago",
    placeholder: "Ingrese el plazo (días)",
  },
  paymentMethod: {
    label: "Método de Pago",
    placeholder: "Seleccione el método de pago",
  },
  paymentPenalty: {
    label: "Penalización",
    placeholder: "Ingrese la penalización por retraso (si aplica)",
  },
  returnPolicies: {
    label: "Políticas de Devolución",
    placeholder: "Ingrese las políticas de devolución",
  },
};
