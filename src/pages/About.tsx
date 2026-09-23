import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <div className="py-12 space-y-12">
      <Helmet>
        <title>About Jude Equipment | Weighing Equipment Supplier in Chennai</title>
        <meta name="description" content="Learn about Jude Equipment Pvt. Ltd., a Chennai-based provider of weighing scales, industrial weighing equipment, billing machines, POS products, cash counters and animal weighing solutions." />
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-12">About Jude Equipment</h1>

        <section className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Weighing & Business Equipment Specialists</h2>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Jude Equipment Pvt. Ltd. is a Chennai-based company offering weighing equipment and business solutions for retail, commercial, industrial and specialized applications.
            </p>
            <p>
              Our range includes electronic and digital weighing scales, industrial weighing machines, mechanical scales, jewellery scales, billing machines, cash counting machines, POS products, animal weighing scales and weighing scale spare parts.
            </p>
          </div>
        </section>

        <section className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Our Legacy & Trust</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-8">
            <div className="p-4 bg-secondary rounded-2xl">
              <p className="text-3xl font-bold text-accent mb-2">2002</p>
              <p className="text-sm font-medium">Manufacturer Since</p>
            </div>
            <div className="p-4 bg-secondary rounded-2xl">
              <p className="text-3xl font-bold text-accent mb-2">1 Lakh+</p>
              <p className="text-sm font-medium">Satisfied Customers</p>
            </div>
            <div className="p-4 bg-secondary rounded-2xl">
              <p className="text-3xl font-bold text-accent mb-2">300+</p>
              <p className="text-sm font-medium">Dealer Network</p>
            </div>
            <div className="p-4 bg-secondary rounded-2xl">
              <p className="text-3xl font-bold text-accent mb-2">108</p>
              <p className="text-sm font-medium">International Clients</p>
            </div>
          </div>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              We pride ourselves on <strong>100% Customer Satisfaction</strong> and providing <strong>100% After Sales & Service Support 24/7</strong>. Our products meet International Standards of Quality.
            </p>
            <p>
              <strong>Certifications & Approvals:</strong><br/>
              • ISO Certified<br/>
              • Government Approved Importer (Certificate IMP/TN/59/2015)<br/>
              • Model Approval Certificate for non-automatic weighing instruments ("JEP-TB" series, table-top type)
            </p>
          </div>
        </section>

        <section className="bg-secondary/50 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">Our Product Range</h2>
          <p className="text-muted mb-6">Our catalogue covers:</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Electronic weighing scales",
              "Industrial weighing scales",
              "Mechanical weighing scales",
              "Digital weighing scales",
              "Jewellery scales",
              "Platform scales",
              "Trolley scales",
              "Crane scales",
              "Billing machines",
              "Cash counting machines",
              "POS equipment",
              "Animal weighing scales",
              "Weighing scale spare parts"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="font-medium text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Our Approach</h2>
          <p className="text-muted leading-relaxed">
            We focus on providing practical equipment solutions with clear specifications and support for different business requirements.
          </p>
        </section>
      </div>
    </div>
  )
}
