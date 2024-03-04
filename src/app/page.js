"use client";

import DoctorLoginForm from "@/components/DoctorLoginForm";
import PatientLoginForm from "@/components/PatientLoginForm";
import Toast from "@/components/ui/Toast";

export default function Home() {
  return (
    <main className="">
      <section className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div role="tablist" className="tabs tabs-boxed">
              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Doctor"  />
              <div role="tabpanel" className="tab-content p-10"><DoctorLoginForm /></div>

              <input type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="Patient" defaultChecked/>
              <div role="tabpanel" className="tab-content p-10"><PatientLoginForm /></div>
            </div>
          </div>
        </div>
      </section>
      <Toast />
    </main>
  );
}
