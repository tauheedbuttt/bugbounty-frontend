import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Code,
  ListOrdered,
  List,
  Link as LinkIcon,
  Image,
  Heading1,
  Heading2,
  Quote,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Strikethrough,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder,
  disabled,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: !disabled,
  });

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleBulletList = () =>
    editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor.chain().focus().toggleOrderedList().run();
  const toggleHeading1 = () =>
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  const toggleHeading2 = () =>
    editor.chain().focus().toggleHeading({ level: 2 }).run();
  const toggleBlockquote = () =>
    editor.chain().focus().toggleBlockquote().run();

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="border border-input rounded-md bg-muted/30">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-input bg-muted/50">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading1}
          className={cn(
            "h-8 px-2",
            editor.isActive("heading", { level: 1 }) && "bg-accent"
          )}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleHeading2}
          className={cn(
            "h-8 px-2",
            editor.isActive("heading", { level: 2 }) && "bg-accent"
          )}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBold}
          className={cn("h-8 px-2", editor.isActive("bold") && "bg-accent")}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleItalic}
          className={cn("h-8 px-2", editor.isActive("italic") && "bg-accent")}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleStrike}
          className={cn("h-8 px-2", editor.isActive("strike") && "bg-accent")}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleCode}
          className={cn("h-8 px-2", editor.isActive("code") && "bg-accent")}
        >
          <Code className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBulletList}
          className={cn(
            "h-8 px-2",
            editor.isActive("bulletList") && "bg-accent"
          )}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleOrderedList}
          className={cn(
            "h-8 px-2",
            editor.isActive("orderedList") && "bg-accent"
          )}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={toggleBlockquote}
          className={cn(
            "h-8 px-2",
            editor.isActive("blockquote") && "bg-accent"
          )}
        >
          <Quote className="h-4 w-4" />
        </Button>

        <div className="w-px h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={setLink}
          className={cn("h-8 px-2", editor.isActive("link") && "bg-accent")}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Editor Content */}
      <div className="p-3 min-h-[150px]">
        <EditorContent
          disabled={disabled}
          editor={editor}
          className="prose prose-sm max-w-none focus:outline-none [&_.ProseMirror]:min-h-[120px] [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:p-0"
        />
        {!content && (
          <div className="text-muted-foreground text-sm pointer-events-none absolute">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
}
