import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get your 2D Animations ready with AI</h2>
          <p className='text-lg'>Make your imagination come true using text based prompts</p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/animate">Get Started</Link>
          </Button>
        </div>
        <Image src="/robo.png" alt="robo-dude" width={400} height={400} className='max-sm:hidden' />
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Animations</h2>
        <div className="interviews-section">
          You haven&apos;t made any animations yet
        </div>
      </section>
      <section className="flex flex-col gap-6 mt-8">
        <h2>Create your 2D Animations</h2>
        <div className='intervies-section'>
          <p>There are no animations available</p>
        </div>
      </section>
    </>
  )
}

export default page