import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet, Input } from "@design-system/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "ui/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <FieldSet className="w-80">
      <FieldLegend>Account Settings</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" placeholder="john_doe" />
          <FieldDescription>Your public display handle.</FieldDescription>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
