import { SidebarProvider, Sidebar, SidebarHeader, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarContent, SidebarInset } from '@/components/ui/sidebar'
import { getPageContent } from '@/lib/content'

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { categories } = getPageContent('order.md') as any;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-headline font-semibold">Categories</h2>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {categories.map((category: any) => (
              <SidebarMenuItem key={category.title}>
                <h3 className="font-bold my-2 px-2 text-muted-foreground">{category.title}</h3>
                <ul className="pl-4">
                  {category.subcategories.map((subcategory: any) => (
                    <SidebarMenuItem key={subcategory.id}>
                      <SidebarMenuButton asChild variant="link" className="h-auto justify-start py-1 px-2 text-muted-foreground">
                        <a href={`#${subcategory.id}`}>{subcategory.title}</a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </ul>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 md:p-8">
            {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
