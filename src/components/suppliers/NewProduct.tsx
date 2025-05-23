import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { FieldConfigs, PartialForm } from "../common/PartialForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDefaultValues, createSchema } from "@/lib/utils";

export function NewProduct({
  onSubmit,
  onCancel,
  open,
  onOpenChange,
}: {
  onSubmit: SubmitHandler<FieldValues>;
  onCancel: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm({
    defaultValues: createDefaultValues(fields),
    resolver: zodResolver(createSchema(fields)),
    mode: "onChange",
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col sm:flex-row items-center px-16 gap-8 sm:max-w-4xl bg-secondary border-black">
        <DialogHeader className="flex flex-col items-center gap-4">
          <DialogTitle className="text-4xl font-bold">
            Agregar Producto o Servicio
          </DialogTitle>
          <DialogDescription className="flex gap-4 justify-around text-black">
            Completa los campos para asociar el Producto o servicio al proveedor
          </DialogDescription>
        </DialogHeader>
        <FormProvider {...form}>
          <PartialForm onAction={onSubmit} fields={fields}>
            <div className="flex gap-4">
              <Button
                variant={"outline"}
                type="button"
                onClick={onCancel}
                className="w-fit py-5 px-12"
              >
                Cancelar
              </Button>
              <Button type="submit" className="w-fit py-5 px-12">
                Agregar
              </Button>
            </div>
          </PartialForm>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

const fields: FieldConfigs = {
  name: { label: "Nombre" },
  description: { label: "Precio" },
  disponibility: { label: "Disponibilidad" },
  brand: { label: "Marca" },
  rating: { label: "Calificación" },
  image: { label: "Foto" },
};
