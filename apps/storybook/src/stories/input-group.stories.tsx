import { Input, InputGroup, InputGroupAddon } from "@design-system/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { AtSign, Search } from "lucide-react";

const meta = {
  title: "ui/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPrefix: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search className="size-4" />
        </InputGroupAddon>
        <Input placeholder="Search records..." />
      </InputGroup>
    </div>
  ),
};

export const WithEmail: Story = {
  render: () => (
    <div className="w-80">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <AtSign className="size-4" />
        </InputGroupAddon>
        <Input placeholder="username" />
        <InputGroupAddon align="inline-end">@example.com</InputGroupAddon>
      </InputGroup>
    </div>
  ),
};
