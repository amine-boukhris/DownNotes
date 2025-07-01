import {Button} from "@/components/ui/button.tsx";

export default function HTMLView() {
  return <div className='space-y-3'>
    <h2 className='text-2xl'>HTML</h2>
    <textarea className='bg-muted w-full min-h-52 rounded-2xl p-4' rows="20" disabled={true}></textarea>
    <div className='flex gap-2'>
      <Button>Save</Button>
      <Button>Download</Button>
    </div>
  </div>
}