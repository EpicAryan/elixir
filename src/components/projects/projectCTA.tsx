import Link from "next/link"
import { PlusIcon } from "lucide-react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion"

const items = [
  {
    id: "1",
    title: "Developing core applications",
    content:
      "We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities, digital experiences.",
  },
  {
    id: "2",
    title: "Unique brand identity and strategy",
    content:
      "We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities, digital experiences.",
  },
  {
    id: "3",
    title: "Tailor-made digital products",
    content:
      "We provide digital experience services to startups and small businesses. We help our clients succeed by creating brand identities, digital experiences.",
  },
]


const ProjectCTA = () => {
  return (
    <section className="container mx-auto px-6 lg:px-8 2xl:px-12 pt-16 pb-8 lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 px-2 2xl:px-16 ">
            <div className="w-full md:max-w-xs lg:max-w-lg flex flex-col justify-center font-gtpro space-y-4 pb-4 lg:pb-0">
                <h3 className="text-3xl lg:text-5xl tracking-tight text-center lg:text-left">Buidling the future of cities</h3>
                <p className="text-sm lg:text-base text-center lg:text-left text-gray-500">Through a unique combination of engineering, construction and design disciplines and expertise.</p>
                <Link href="#">
                    <p className="text-sm lg:text-base text-center lg:text-left cursor-pointer">Would you like to work with us?</p>
                </Link>
            </div>
            <div className="max-w-2xl ">
                <Component/>
            </div>
        </div>
    </section>
  )
}

export default ProjectCTA

export function Component() {
  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="py-2">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-sm lg:text-[18px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0 cursor-pointer">
                {item.title}
                <PlusIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-gray-600 pb-2 text-xs lg:text-sm">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
