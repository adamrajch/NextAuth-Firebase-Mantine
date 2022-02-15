import Footer from "./footer"
import Header from "./header"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div style={{ padding: 16 }}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
