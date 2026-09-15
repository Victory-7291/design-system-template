import { Button, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@design-system/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { FolderPlus } from "lucide-react";

const meta = {
  title: "ui/Empty",
  component: Empty,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Empty className="w-96 border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderPlus className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No Projects Found</EmptyTitle>
        <EmptyDescription>
          Get started by creating a new project or importing an existing repository.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Create Project</Button>
      </EmptyContent>
    </Empty>
  ),
};
