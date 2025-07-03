import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export default function MarkdownView() {

  const [markdownInput, setMarkdownInput] = useState('')

  return <div className='space-y-3'>
    <h2 className='text-2xl'>Markdown</h2>
    <textarea className='bg-muted w-full min-h-52 rounded-2xl p-4' rows={20} value={markdownInput}
              onChange={e => setMarkdownInput(e.target.value)}></textarea>
    <div className='flex gap-2'>
      <Button>Convert</Button>
      <Button>Upload</Button>
      <Button variant={'destructive'}>Clear</Button>
      <Button variant={'secondary'}>Sample Markdown</Button>
    </div>
  </div>
}