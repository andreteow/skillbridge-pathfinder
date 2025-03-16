
import Layout from "@/components/Layout";

const Pathway = () => {
  return (
    <Layout>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Learning Pathway</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-lg mb-4">
            Your personalized learning pathway will appear here once you complete your skill assessment.
          </p>
          <p>
            To get started, go to the <a href="/assessment" className="text-skill-primary hover:underline">Skill Assessment</a> page.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Pathway;
