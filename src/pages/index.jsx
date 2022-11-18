import Head from 'next/head'
import { useState } from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { Navbar } from '@/components/Navbar'
import { Header } from '@/components/Header'

import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import { CursorArrowRaysIcon, EnvelopeOpenIcon, UsersIcon } from '@heroicons/react/24/outline'

const stats = [
  { id: 1, name: 'Total Customers', stat: '71,897', icon: UsersIcon, change: '122', changeType: 'increase' },
  { id: 2, name: 'Avg. Conversion Rate', stat: '58.16%', icon: EnvelopeOpenIcon, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Avg. Click Rate', stat: '24.57%', icon: CursorArrowRaysIcon, change: '3.2%', changeType: 'decrease' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default withPageAuthRequired(function Home({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  return (
    <>
      <Head>
        <title>Home - Kohort App</title>
      </Head>
      <div className="min-h-full">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex flex-1 flex-col lg:pl-64">
          <Header setSidebarOpen={setSidebarOpen} user={user} />
          <main className="flex-1 py-10">
            <div class="px-4 sm:px-6 lg:px-8">
              <h1 class="text-3xl font-medium leading-tight tracking-tight text-gray-900">Home</h1>
              <h3 className="text-lg mt-12 leading-6 text-gray-900">Last 30 days</h3>

              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-kohort-50 px-4 pt-5 shadow sm:px-6 sm:pt-6"
                  >
                    <dt>
                      <div className="absolute rounded-md bg-kohort-800 p-3">
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                      <p
                        className={classNames(
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                          'ml-2 flex items-baseline text-sm font-semibold'
                        )}
                      >
                        {item.changeType === 'increase' ? (
                          <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
                        ) : (
                          <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
                        )}

                        <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                        {item.change}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            
          </main>
        </div>
      </div>
    </>
  )
})