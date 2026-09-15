import { Button, ButtonGroup } from "@design-system/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { Bold, Italic, Underline } from "lucide-react";

const meta = {
  title: "ui/ButtonGroup",
  component: ButtonGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">Archive</Button>
      <Button variant="outline">Spam</Button>
      <Button variant="outline">Delete</Button>
    </ButtonGroup>
  ),
};

export const Icons: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <Bold className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Italic className="size-4" />
      </Button>
      <Button variant="outline" size="icon">
        <Underline className="size-4" />
      </Button>
    </ButtonGroup>
  ),
};
